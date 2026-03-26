import { api } from '../../../services/api'

const normalizeListResponse = (response) => response?.data || []
const normalizeItemResponse = (response) => response?.data || null

export const propertyApi = {
  list: (params = {}) => {
    const searchParams = new URLSearchParams()

    if (params.city) searchParams.set('city', params.city)
    if (params.min_price) searchParams.set('min_price', String(params.min_price))
    if (params.max_price) searchParams.set('max_price', String(params.max_price))
    if (params.min_guests) searchParams.set('min_guests', String(params.min_guests))

    const queryString = searchParams.toString()
    const path = queryString ? `/properties?${queryString}` : '/properties'
    return api.get(path).then(normalizeListResponse)
  },
  getById: (id) => api.get(`/properties/${id}`).then(normalizeItemResponse),
  create: (payload) => api.post('/properties', payload).then(normalizeItemResponse),
  update: (id, payload) => api.put(`/properties/${id}`, payload).then(normalizeItemResponse),
  remove: (id) => api.delete(`/properties/${id}`)
}
