const asyncHandler = require('../../utils/asyncHandler');
const service = require('./maintenance.service');

const list = asyncHandler(async (req, res) => {
  const requests = await service.listRequests(req.user);
  res.json({ success: true, data: requests });
});

const create = asyncHandler(async (req, res) => {
  const request = await service.createRequest(req.user, req.body);
  res.status(201).json({ success: true, message: 'Maintenance request created', data: request });
});

const updateStatus = asyncHandler(async (req, res) => {
  const request = await service.updateStatus(Number(req.params.id), req.user, req.body.status);
  res.json({ success: true, message: 'Maintenance status updated', data: request });
});

module.exports = {
  list,
  create,
  updateStatus
};
