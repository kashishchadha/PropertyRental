import { api } from '../../../services/api'

export const bookingApi = {
  listMine: () => api.get('/bookings').then((response) => response?.data || []),
  create: (payload) => api.post('/bookings', payload).then((response) => response?.data || null),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }).then((response) => response?.data || null)
}
