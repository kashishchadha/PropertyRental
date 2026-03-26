const express = require('express');

const controller = require('./payment.controller');
const requireAuth = require('../../middleware/auth');
const validateRequest = require('../../middleware/validateRequest');
const { createPaymentValidation, bookingPaymentsValidation } = require('./payment.validation');

const router = express.Router();

router.post('/', requireAuth, createPaymentValidation, validateRequest, controller.create);
router.get('/booking/:bookingId', requireAuth, bookingPaymentsValidation, validateRequest, controller.listByBooking);

module.exports = router;
