const jwt = require('jsonwebtoken');
const env = require('../config/env');

const signJwt = (payload) => jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
const verifyJwt = (token) => jwt.verify(token, env.jwt.secret);

module.exports = {
  signJwt,
  verifyJwt
};
