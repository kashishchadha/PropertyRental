const pool = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const listProperties = async (filters) => {
  const where = ['is_active = 1'];
  const params = [];

  if (filters.city) {
    where.push('city = ?');
    params.push(filters.city);
  }

  if (filters.min_price) {
    where.push('price_per_night >= ?');
    params.push(Number(filters.min_price));
  }

  if (filters.max_price) {
    where.push('price_per_night <= ?');
    params.push(Number(filters.max_price));
  }

  if (filters.min_guests) {
    where.push('max_guests >= ?');
    params.push(Number(filters.min_guests));
  }

  const [rows] = await pool.query(
    `SELECT p.*, u.name AS owner_name
     FROM properties p
     JOIN users u ON u.id = p.owner_id
     WHERE ${where.join(' AND ')}
     ORDER BY p.created_at DESC`,
    params
  );

  return rows;
};

const getPropertyById = async (id) => {
  const [rows] = await pool.query(
    `SELECT p.*, u.name AS owner_name
     FROM properties p
     JOIN users u ON u.id = p.owner_id
     WHERE p.id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw new ApiError(404, 'Property not found');
  }

  return rows[0];
};

const createProperty = async (ownerId, payload) => {
  const [result] = await pool.query(
    `INSERT INTO properties
      (owner_id, title, description, city, address, price_per_night, bedrooms, bathrooms, max_guests)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ownerId,
      payload.title,
      payload.description || null,
      payload.city,
      payload.address,
      payload.price_per_night,
      payload.bedrooms,
      payload.bathrooms,
      payload.max_guests
    ]
  );

  return getPropertyById(result.insertId);
};

const updateProperty = async (propertyId, user, payload) => {
  const property = await getPropertyById(propertyId);

  if (user.role !== 'admin' && property.owner_id !== user.sub) {
    throw new ApiError(403, 'Only the owner or admin can update this property');
  }

  const fields = [];
  const values = [];

  const allowedFields = ['title', 'description', 'city', 'address', 'price_per_night', 'bedrooms', 'bathrooms', 'max_guests', 'is_active'];

  for (const key of allowedFields) {
    if (payload[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(payload[key]);
    }
  }

  if (fields.length === 0) {
    return property;
  }

  values.push(propertyId);
  await pool.query(`UPDATE properties SET ${fields.join(', ')} WHERE id = ?`, values);

  return getPropertyById(propertyId);
};

const deleteProperty = async (propertyId, user) => {
  const property = await getPropertyById(propertyId);

  if (user.role !== 'admin' && property.owner_id !== user.sub) {
    throw new ApiError(403, 'Only the owner or admin can delete this property');
  }

  await pool.query('DELETE FROM properties WHERE id = ?', [propertyId]);
};

module.exports = {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
