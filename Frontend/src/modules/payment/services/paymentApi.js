import { api } from '../../../services/api'

export const paymentApi = {
  create: (payload) => api.post('/payments', payload).then((response) => response?.data || null),
  listByBooking: (bookingId) => api.get(`/payments/booking/${bookingId}`).then((response) => response?.data || []),
  createStripeCheckoutSession: (payload) => api.post('/payments/stripe/checkout-session', payload).then((response) => response?.data || null)
}
