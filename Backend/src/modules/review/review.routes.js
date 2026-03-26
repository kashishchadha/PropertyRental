const express = require('express');

const controller = require('./review.controller');
const requireAuth = require('../../middleware/auth');
const validateRequest = require('../../middleware/validateRequest');
const { createReviewValidation, getPropertyReviewsValidation } = require('./review.validation');

const router = express.Router();

router.post('/', requireAuth, createReviewValidation, validateRequest, controller.create);
router.get('/property/:propertyId', getPropertyReviewsValidation, validateRequest, controller.getByProperty);

module.exports = router;
