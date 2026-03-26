const ApiError = require('../utils/ApiError');
const { verifyJwt } = require('../utils/jwt');

const requireAuth = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing or invalid Authorization header'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    return next();
  } catch (_err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = requireAuth;
