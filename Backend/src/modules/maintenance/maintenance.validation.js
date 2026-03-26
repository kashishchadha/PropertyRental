const { body, param } = require('express-validator');

const createMaintenanceValidation = [
  body('property_id').isInt({ min: 1 }).withMessage('property_id must be a positive integer'),
  body('title').trim().notEmpty().withMessage('title is required'),
  body('description').trim().notEmpty().withMessage('description is required'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('invalid priority')
];

const updateMaintenanceStatusValidation = [
  param('id').isInt({ min: 1 }).withMessage('Invalid maintenance request id'),
  body('status').isIn(['open', 'in_progress', 'resolved', 'closed']).withMessage('invalid status')
];

module.exports = {
  createMaintenanceValidation,
  updateMaintenanceStatusValidation
};
