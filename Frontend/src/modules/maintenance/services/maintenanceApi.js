import { api } from '../../../services/api'

export const maintenanceApi = {
  list: () => api.get('/maintenance').then((response) => response?.data || [])
}
