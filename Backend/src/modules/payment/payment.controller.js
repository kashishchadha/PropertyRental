const asyncHandler = require('../../utils/asyncHandler');
const service = require('./payment.service');

const create = asyncHandler(async (req, res) => {
  const payment = await service.createPayment(req.user, req.body);
  res.status(201).json({ success: true, message: 'Payment recorded', data: payment });
});

const listByBooking = asyncHandler(async (req, res) => {
  const payments = await service.listPaymentsForBooking(req.user, Number(req.params.bookingId));
  res.json({ success: true, data: payments });
});

module.exports = {
  create,
  listByBooking
};
