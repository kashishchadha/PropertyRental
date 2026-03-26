const asyncHandler = require('../../utils/asyncHandler');
const service = require('./property.service');

const list = asyncHandler(async (req, res) => {
  const properties = await service.listProperties(req.query);
  res.json({ success: true, data: properties });
});

const getById = asyncHandler(async (req, res) => {
  const property = await service.getPropertyById(Number(req.params.id));
  res.json({ success: true, data: property });
});

const create = asyncHandler(async (req, res) => {
  const property = await service.createProperty(req.user.sub, req.body);
  res.status(201).json({ success: true, message: 'Property created', data: property });
});

const update = asyncHandler(async (req, res) => {
  const property = await service.updateProperty(Number(req.params.id), req.user, req.body);
  res.json({ success: true, message: 'Property updated', data: property });
});

const remove = asyncHandler(async (req, res) => {
  await service.deleteProperty(Number(req.params.id), req.user);
  res.json({ success: true, message: 'Property deleted' });
});

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
