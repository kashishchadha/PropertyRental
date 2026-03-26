import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function AuthBootstrap({ children }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return children
}
