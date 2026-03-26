const pool = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const getBookingById = async (id) => {
  const [rows] = await pool.query(
    `SELECT b.*, p.owner_id
     FROM bookings b
     JOIN properties p ON p.id = b.property_id
     WHERE b.id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw new ApiError(404, 'Booking not found');
  }

  return rows[0];
};

const listMyBookings = async (user) => {
  const [rows] = await pool.query(
    `SELECT b.*, p.title AS property_title, p.city, p.owner_id
     FROM bookings b
     JOIN properties p ON p.id = b.property_id
     WHERE b.tenant_id = ? OR p.owner_id = ? OR ? = 'admin'
     ORDER BY b.created_at DESC`,
    [user.sub, user.sub, user.role]
  );

  return rows;
};

const createBooking = async (tenantId, payload) => {
  const { property_id: propertyId, start_date: startDate, end_date: endDate } = payload;

  if (new Date(startDate) >= new Date(endDate)) {
    throw new ApiError(400, 'start_date must be before end_date');
  }

  const [properties] = await pool.query('SELECT * FROM properties WHERE id = ? AND is_active = 1', [propertyId]);

  if (properties.length === 0) {
    throw new ApiError(404, 'Property not found or inactive');
  }

  const property = properties[0];

  const [overlaps] = await pool.query(
    `SELECT id FROM bookings
     WHERE property_id = ?
       AND status IN ('pending', 'confirmed')
       AND start_date < ?
       AND end_date > ?`,
    [propertyId, endDate, startDate]
  );

  if (overlaps.length > 0) {
    throw new ApiError(409, 'Selected dates overlap with an existing booking');
  }

  const nights = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const totalAmount = nights * Number(property.price_per_night);

  const [result] = await pool.query(
    `INSERT INTO bookings (property_id, tenant_id, start_date, end_date, total_amount, status)
     VALUES (?, ?, ?, ?, ?, 'pending')`,
    [propertyId, tenantId, startDate, endDate, totalAmount]
  );

  return getBookingById(result.insertId);
};

const updateBookingStatus = async (id, user, status) => {
  const booking = await getBookingById(id);

  const canUpdate = user.role === 'admin' || user.sub === booking.owner_id || user.sub === booking.tenant_id;
  if (!canUpdate) {
    throw new ApiError(403, 'Not allowed to update this booking');
  }

  await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
  return getBookingById(id);
};

module.exports = {
  listMyBookings,
  createBooking,
  updateBookingStatus,
  getBookingById
};
