const asyncHandler = require('../../utils/asyncHandler');
const service = require('./payment.service');

const create = asyncHandler(async (req, res) => {
  const payment = await service.createPayment(req.user, req.body);
  res.status(201).json({ success: true, message: 'Payment recorded', data: payment });
});

const createStripeCheckoutSession = asyncHandler(async (req, res) => {
  const session = await service.createStripeCheckoutSession(req.user, req.body);
  res.status(201).json({ success: true, message: 'Stripe checkout session created', data: session });
});

const listByBooking = asyncHandler(async (req, res) => {
  const payments = await service.listPaymentsForBooking(req.user, Number(req.params.bookingId));
  res.json({ success: true, data: payments });
});

const stripeWebhook = async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    await service.handleStripeWebhook(req.body, signature);
    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Webhook processing failed' });
  }
};

module.exports = {
  create,
  createStripeCheckoutSession,
  listByBooking,
  stripeWebhook
};
