const { body, param, query } = require('express-validator');

const createPropertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('price_per_night').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be >= 0'),
  body('bathrooms').isInt({ min: 0 }).withMessage('Bathrooms must be >= 0'),
  body('max_guests').isInt({ min: 1 }).withMessage('Max guests must be >= 1')
];

const updatePropertyValidation = [
  param('id').isInt({ min: 1 }).withMessage('Invalid property id'),
  body('title').optional().trim().notEmpty(),
  body('description').optional().isString(),
  body('city').optional().trim().notEmpty(),
  body('address').optional().trim().notEmpty(),
  body('price_per_night').optional().isFloat({ min: 0 }),
  body('bedrooms').optional().isInt({ min: 0 }),
  body('bathrooms').optional().isInt({ min: 0 }),
  body('max_guests').optional().isInt({ min: 1 }),
  body('is_active').optional().isBoolean()
];

const idValidation = [param('id').isInt({ min: 1 }).withMessage('Invalid property id')];

const listPropertyValidation = [
  query('city').optional().isString(),
  query('min_price').optional().isFloat({ min: 0 }),
  query('max_price').optional().isFloat({ min: 0 }),
  query('min_guests').optional().isInt({ min: 1 })
];

module.exports = {
  createPropertyValidation,
  updatePropertyValidation,
  idValidation,
  listPropertyValidation
};
