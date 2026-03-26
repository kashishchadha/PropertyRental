const asyncHandler = require('../../utils/asyncHandler');
const service = require('./review.service');

const create = asyncHandler(async (req, res) => {
  const review = await service.createReview(req.user, req.body);
  res.status(201).json({ success: true, message: 'Review submitted', data: review });
});

const getByProperty = asyncHandler(async (req, res) => {
  const reviews = await service.getPropertyReviews(Number(req.params.propertyId));
  res.json({ success: true, data: reviews });
});

module.exports = {
  create,
  getByProperty
};
