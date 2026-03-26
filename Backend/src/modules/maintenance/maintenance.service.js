const pool = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const allowedTransitions = {
  open: ['in_progress', 'closed'],
  in_progress: ['resolved', 'closed'],
  resolved: ['closed'],
  closed: []
};

const listRequests = async (user) => {
  const [rows] = await pool.query(
    `SELECT mr.*, p.title AS property_title, p.owner_id
     FROM maintenance_requests mr
     JOIN properties p ON p.id = mr.property_id
     WHERE ? = 'admin' OR mr.reported_by = ? OR p.owner_id = ?
     ORDER BY mr.created_at DESC`,
    [user.role, user.sub, user.sub]
  );

  return rows;
};

const createRequest = async (user, payload) => {
  const [properties] = await pool.query('SELECT id, owner_id FROM properties WHERE id = ?', [payload.property_id]);

  if (properties.length === 0) {
    throw new ApiError(404, 'Property not found');
  }

  if (user.role === 'tenant') {
    const [bookings] = await pool.query(
      `SELECT id FROM bookings
       WHERE property_id = ? AND tenant_id = ? AND status IN ('confirmed', 'completed')
       LIMIT 1`,
      [payload.property_id, user.sub]
    );

    if (bookings.length === 0) {
      throw new ApiError(403, 'Tenant can request maintenance only for booked properties');
    }
  }

  const [result] = await pool.query(
    `INSERT INTO maintenance_requests (property_id, reported_by, title, description, priority, status)
     VALUES (?, ?, ?, ?, ?, 'open')`,
    [payload.property_id, user.sub, payload.title, payload.description, payload.priority || 'medium']
  );

  const [rows] = await pool.query('SELECT * FROM maintenance_requests WHERE id = ?', [result.insertId]);
  return rows[0];
};

const updateStatus = async (id, user, nextStatus) => {
  const [rows] = await pool.query(
    `SELECT mr.*, p.owner_id
     FROM maintenance_requests mr
     JOIN properties p ON p.id = mr.property_id
     WHERE mr.id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw new ApiError(404, 'Maintenance request not found');
  }

  const request = rows[0];
  const canUpdate = user.role === 'admin' || user.sub === request.owner_id;

  if (!canUpdate) {
    throw new ApiError(403, 'Only owner/admin can update maintenance status');
  }

  if (!allowedTransitions[request.status].includes(nextStatus)) {
    throw new ApiError(400, `Invalid status transition from ${request.status} to ${nextStatus}`);
  }

  await pool.query('UPDATE maintenance_requests SET status = ?, updated_at = NOW() WHERE id = ?', [nextStatus, id]);

  const [updatedRows] = await pool.query('SELECT * FROM maintenance_requests WHERE id = ?', [id]);
  return updatedRows[0];
};

module.exports = {
  listRequests,
  createRequest,
  updateStatus
};
