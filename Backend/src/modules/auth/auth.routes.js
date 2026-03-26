const express = require('express');

const controller = require('./auth.controller');
const { registerValidation, loginValidation } = require('./auth.validation');
const validateRequest = require('../../middleware/validateRequest');
const requireAuth = require('../../middleware/auth');

const router = express.Router();

router.post('/register', registerValidation, validateRequest, controller.register);
router.post('/login', loginValidation, validateRequest, controller.login);
router.get('/me', requireAuth, controller.me);

module.exports = router;
