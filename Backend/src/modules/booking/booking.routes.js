const express = require('express');

const controller = require('./booking.controller');
const { createBookingValidation, updateStatusValidation } = require('./booking.validation');
const requireAuth = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const validateRequest = require('../../middleware/validateRequest');

const router = express.Router();

router.get('/', requireAuth, controller.listMine);
router.post('/', requireAuth, authorize('tenant', 'admin'), createBookingValidation, validateRequest, controller.create);
router.patch('/:id/status', requireAuth, updateStatusValidation, validateRequest, controller.updateStatus);

module.exports = router;
