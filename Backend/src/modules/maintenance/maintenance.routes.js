const express = require('express');

const controller = require('./maintenance.controller');
const requireAuth = require('../../middleware/auth');
const validateRequest = require('../../middleware/validateRequest');
const { createMaintenanceValidation, updateMaintenanceStatusValidation } = require('./maintenance.validation');

const router = express.Router();

router.get('/', requireAuth, controller.list);
router.post('/', requireAuth, createMaintenanceValidation, validateRequest, controller.create);
router.patch('/:id/status', requireAuth, updateMaintenanceStatusValidation, validateRequest, controller.updateStatus);

module.exports = router;
