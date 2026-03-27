const pool = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const Stripe = require('stripe');
const env = require('../../config/env');

let stripeClient;

const getStripeClient = () => {
  if (!env.stripe.secretKey) {
    throw new ApiError(500, 'Stripe secret key is not configured');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(env.stripe.secretKey);
  }

  return stripeClient;
};

const getBookingWithOwner = async (bookingId) => {
  const [bookings] = await pool.query(
    `SELECT b.*, p.owner_id
     FROM bookings b
     JOIN properties p ON p.id = b.property_id
     WHERE b.id = ?`,
    [bookingId]
  );

  if (bookings.length === 0) {
    throw new ApiError(404, 'Booking not found');
  }

  return bookings[0];
};

const createPayment = async (user, payload) => {
  const booking = await getBookingWithOwner(payload.booking_id);

  if (user.role !== 'admin' && booking.tenant_id !== user.sub) {
    throw new ApiError(403, 'Only the booking tenant can pay this booking');
  }

  const [existingPaid] = await pool.query(
    'SELECT id FROM payments WHERE booking_id = ? AND status = "paid" LIMIT 1',
    [payload.booking_id]
  );

  if (existingPaid.length > 0) {
    throw new ApiError(409, 'This booking has already been paid');
  }

  const [result] = await pool.query(
    `INSERT INTO payments (booking_id, amount, provider, provider_ref, status, paid_at)
     VALUES (?, ?, ?, ?, 'paid', NOW())`,
    [payload.booking_id, booking.total_amount, payload.provider, payload.provider_ref]
  );

  if (booking.status === 'pending') {
    await pool.query('UPDATE bookings SET status = "confirmed" WHERE id = ?', [payload.booking_id]);
  }

  const [rows] = await pool.query('SELECT * FROM payments WHERE id = ?', [result.insertId]);
  return rows[0];
};

const createStripeCheckoutSession = async (user, payload) => {
  const bookingId = Number(payload.booking_id);
  const booking = await getBookingWithOwner(bookingId);

  if (user.role !== 'admin' && booking.tenant_id !== user.sub) {
    throw new ApiError(403, 'Only the booking tenant can pay this booking');
  }

  const [existingPaid] = await pool.query(
    'SELECT id FROM payments WHERE booking_id = ? AND status = "paid" LIMIT 1',
    [bookingId]
  );

  if (existingPaid.length > 0) {
    throw new ApiError(409, 'This booking has already been paid');
  }

  const successUrl = payload.success_url || env.stripe.successUrl || `${env.appBaseUrl}/booking-payment/${bookingId}?payment=success`;
  const cancelUrl = payload.cancel_url || env.stripe.cancelUrl || `${env.appBaseUrl}/booking-payment/${bookingId}?payment=cancelled`;

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: env.stripe.currency,
          unit_amount: Math.round(Number(booking.total_amount) * 100),
          product_data: {
            name: `Booking #${booking.id}`,
            description: `Property booking payment for booking ${booking.id}`
          }
        }
      }
    ],
    metadata: {
      booking_id: String(booking.id)
    },
    success_url: successUrl,
    cancel_url: cancelUrl
  });

  await pool.query(
    `INSERT INTO payments (booking_id, amount, provider, provider_ref, status)
     VALUES (?, ?, 'stripe', ?, 'pending')`,
    [booking.id, booking.total_amount, session.id]
  );

  return {
    id: session.id,
    url: session.url
  };
};

const markStripePaymentStatus = async ({ sessionId, status, bookingId, amountInMajor }) => {
  if (!sessionId) {
    return;
  }

  const [payments] = await pool.query('SELECT * FROM payments WHERE provider_ref = ? LIMIT 1', [sessionId]);
  const payment = payments[0];

  if (!payment && !bookingId) {
    return;
  }

  const effectiveBookingId = payment ? payment.booking_id : Number(bookingId);
  const effectiveAmount = Number(amountInMajor || payment?.amount || 0);

  if (!payment) {
    await pool.query(
      `INSERT INTO payments (booking_id, amount, provider, provider_ref, status, paid_at)
       VALUES (?, ?, 'stripe', ?, ?, ?)` ,
      [effectiveBookingId, effectiveAmount, sessionId, status, status === 'paid' ? new Date() : null]
    );
  } else if (status === 'paid' && payment.status !== 'paid') {
    await pool.query(
      'UPDATE payments SET status = ?, paid_at = NOW(), amount = ? WHERE id = ?',
      [status, effectiveAmount || payment.amount, payment.id]
    );
  } else if (status !== payment.status && status !== 'paid') {
    await pool.query('UPDATE payments SET status = ? WHERE id = ?', [status, payment.id]);
  }

  if (status === 'paid') {
    await pool.query('UPDATE bookings SET status = "confirmed" WHERE id = ? AND status = "pending"', [effectiveBookingId]);
  }
};

const handleStripeWebhook = async (rawBody, signature) => {
  if (!env.stripe.webhookSecret) {
    throw new ApiError(500, 'Stripe webhook secret is not configured');
  }

  if (!signature) {
    throw new ApiError(400, 'Missing Stripe signature header');
  }

  const stripe = getStripeClient();
  const event = stripe.webhooks.constructEvent(rawBody, signature, env.stripe.webhookSecret);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await markStripePaymentStatus({
      sessionId: session.id,
      status: 'paid',
      bookingId: session.metadata?.booking_id,
      amountInMajor: Number(session.amount_total || 0) / 100
    });
  }

  if (event.type === 'checkout.session.expired' || event.type === 'checkout.session.async_payment_failed') {
    const session = event.data.object;
    await markStripePaymentStatus({
      sessionId: session.id,
      status: 'failed',
      bookingId: session.metadata?.booking_id,
      amountInMajor: Number(session.amount_total || 0) / 100
    });
  }
};

const listPaymentsForBooking = async (user, bookingId) => {
  const [bookings] = await pool.query(
    `SELECT b.*, p.owner_id
     FROM bookings b
     JOIN properties p ON p.id = b.property_id
     WHERE b.id = ?`,
    [bookingId]
  );

  if (bookings.length === 0) {
    throw new ApiError(404, 'Booking not found');
  }

  const booking = bookings[0];
  const canView = user.role === 'admin' || user.sub === booking.tenant_id || user.sub === booking.owner_id;

  if (!canView) {
    throw new ApiError(403, 'Not allowed to view these payments');
  }

  const [rows] = await pool.query('SELECT * FROM payments WHERE booking_id = ? ORDER BY created_at DESC', [bookingId]);
  return rows;
};

module.exports = {
  createPayment,
  createStripeCheckoutSession,
  listPaymentsForBooking,
  handleStripeWebhook
};
