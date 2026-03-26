const express = require('express');

const authRoutes = require('../modules/auth/auth.routes');
const propertyRoutes = require('../modules/property/property.routes');
const bookingRoutes = require('../modules/booking/booking.routes');
const paymentRoutes = require('../modules/payment/payment.routes');
const maintenanceRoutes = require('../modules/maintenance/maintenance.routes');
const reviewRoutes = require('../modules/review/review.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
