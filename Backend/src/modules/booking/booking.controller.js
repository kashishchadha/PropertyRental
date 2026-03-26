const asyncHandler = require('../../utils/asyncHandler');
const service = require('./booking.service');

const listMine = asyncHandler(async (req, res) => {
  const bookings = await service.listMyBookings(req.user);
  res.json({ success: true, data: bookings });
});

const create = asyncHandler(async (req, res) => {
  const booking = await service.createBooking(req.user.sub, req.body);
  res.status(201).json({ success: true, message: 'Booking created', data: booking });
});

const updateStatus = asyncHandler(async (req, res) => {
  const booking = await service.updateBookingStatus(Number(req.params.id), req.user, req.body.status);
  res.json({ success: true, message: 'Booking status updated', data: booking });
});

module.exports = {
  listMine,
  create,
  updateStatus
};
