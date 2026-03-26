const { body, param } = require('express-validator');

const createBookingValidation = [
  body('property_id').isInt({ min: 1 }).withMessage('property_id must be a positive integer'),
  body('start_date').isISO8601().withMessage('start_date must be a valid date'),
  body('end_date').isISO8601().withMessage('end_date must be a valid date')
];

const updateStatusValidation = [
  param('id').isInt({ min: 1 }).withMessage('Invalid booking id'),
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid booking status')
];

module.exports = {
  createBookingValidation,
  updateStatusValidation
};
