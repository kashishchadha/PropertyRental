const bcrypt = require('bcryptjs');
const pool = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  created_at: user.created_at
});

const register = async ({ name, email, password, role = 'tenant' }) => {
  if (role === 'admin') {
    throw new ApiError(403, 'Admin registration is not allowed from public signup');
  }

  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    throw new ApiError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, role]
  );

  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [result.insertId]);
  return toPublicUser(rows[0]);
};

const login = async ({ email, password }) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  return toPublicUser(user);
};

const getProfileById = async (id) => {
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);

  if (rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }

  return toPublicUser(rows[0]);
};

module.exports = {
  register,
  login,
  getProfileById
};
