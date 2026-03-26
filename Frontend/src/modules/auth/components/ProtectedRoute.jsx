import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

function ProtectedRoute({ children, roles }) {
  const user = useAuthStore((state) => state.user)
  const isHydrating = useAuthStore((state) => state.isHydrating)
  const isAuthenticated = Boolean(user)

  if (isHydrating) {
    return <div className="p-6 text-center text-sm text-slate-500">Checking session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (Array.isArray(roles) && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
