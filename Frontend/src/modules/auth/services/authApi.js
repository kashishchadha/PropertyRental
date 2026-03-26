import { api } from '../../../services/api'

export const authApi = {
  signup: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  me: () => api.get('/auth/me')
}
