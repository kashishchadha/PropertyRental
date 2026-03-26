const { body, param } = require('express-validator');

const createPaymentValidation = [
  body('booking_id').isInt({ min: 1 }).withMessage('booking_id must be positive integer'),
  body('provider').trim().notEmpty().withMessage('provider is required'),
  body('provider_ref').trim().notEmpty().withMessage('provider_ref is required')
];

const bookingPaymentsValidation = [
  param('bookingId').isInt({ min: 1 }).withMessage('Invalid booking id')
];

module.exports = {
  createPaymentValidation,
  bookingPaymentsValidation
};
