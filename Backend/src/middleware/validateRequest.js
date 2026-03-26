const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ApiError(422, JSON.stringify({ errors: errors.array() })));
  }

  return next();
};

module.exports = validateRequest;
