const pool = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const createReview = async (user, payload) => {
  if (user.role !== 'tenant' && user.role !== 'admin') {
    throw new ApiError(403, 'Only tenant/admin can create reviews');
  }

  const [bookings] = await pool.query(
    `SELECT id, status, property_id, tenant_id
     FROM bookings
     WHERE id = ?`,
    [payload.booking_id]
  );

  if (bookings.length === 0) {
    throw new ApiError(404, 'Booking not found');
  }

  const booking = bookings[0];

  if (booking.property_id !== payload.property_id) {
    throw new ApiError(400, 'Booking does not belong to the provided property');
  }

  if (booking.status !== 'completed') {
    throw new ApiError(400, 'Only completed bookings can be reviewed');
  }

  if (user.role !== 'admin' && booking.tenant_id !== user.sub) {
    throw new ApiError(403, 'You can only review your own completed bookings');
  }

  const [existing] = await pool.query('SELECT id FROM reviews WHERE booking_id = ?', [payload.booking_id]);
  if (existing.length > 0) {
    throw new ApiError(409, 'A review already exists for this booking');
  }

  const [result] = await pool.query(
    `INSERT INTO reviews (property_id, booking_id, tenant_id, rating, comment)
     VALUES (?, ?, ?, ?, ?)`,
    [payload.property_id, payload.booking_id, booking.tenant_id, payload.rating, payload.comment || null]
  );

  const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [result.insertId]);
  return rows[0];
};

const getPropertyReviews = async (propertyId) => {
  const [rows] = await pool.query(
    `SELECT r.*, u.name AS tenant_name
     FROM reviews r
     JOIN users u ON u.id = r.tenant_id
     WHERE r.property_id = ?
     ORDER BY r.created_at DESC`,
    [propertyId]
  );

  return rows;
};

module.exports = {
  createReview,
  getPropertyReviews
};
