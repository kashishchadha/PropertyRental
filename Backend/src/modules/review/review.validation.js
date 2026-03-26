const { body, param } = require('express-validator');

const createReviewValidation = [
  body('property_id').isInt({ min: 1 }).withMessage('property_id must be positive integer'),
  body('booking_id').isInt({ min: 1 }).withMessage('booking_id must be positive integer'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('rating must be between 1 and 5'),
  body('comment').optional().isString()
];

const getPropertyReviewsValidation = [
  param('propertyId').isInt({ min: 1 }).withMessage('Invalid property id')
];

module.exports = {
  createReviewValidation,
  getPropertyReviewsValidation
};
