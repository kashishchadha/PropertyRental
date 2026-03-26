import { create } from 'zustand'
import { authApi } from '../services/authApi'

export const useAuthStore = create((set, get) => ({
  user: null,
  isHydrating: true,

  initializeAuth: async () => {
    if (get().isHydrating === false) {
      return
    }

    const token = localStorage.getItem('auth_token')
    if (!token) {
      set({ user: null, isHydrating: false })
      return
    }

    try {
      const response = await authApi.me()
      set({ user: response?.data || null, isHydrating: false })
    } catch {
      localStorage.removeItem('auth_token')
      set({ user: null, isHydrating: false })
    }
  },

  login: ({ user, token }) => {
    localStorage.setItem('auth_token', token)
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    set({ user: null })
  }
}))
