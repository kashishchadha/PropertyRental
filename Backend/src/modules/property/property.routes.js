const express = require('express');

const controller = require('./property.controller');
const validateRequest = require('../../middleware/validateRequest');
const requireAuth = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const {
  createPropertyValidation,
  updatePropertyValidation,
  idValidation,
  listPropertyValidation
} = require('./property.validation');

const router = express.Router();

router.get('/', listPropertyValidation, validateRequest, controller.list);
router.get('/:id', idValidation, validateRequest, controller.getById);
router.post('/', requireAuth, authorize('owner', 'admin'), createPropertyValidation, validateRequest, controller.create);
router.put('/:id', requireAuth, authorize('owner', 'admin'), updatePropertyValidation, validateRequest, controller.update);
router.delete('/:id', requireAuth, authorize('owner', 'admin'), idValidation, validateRequest, controller.remove);

module.exports = router;
