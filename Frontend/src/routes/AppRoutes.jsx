import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import AddProperty from '../pages/AddProperty'
import AllProperties from '../pages/AllProperties'
import PropertyDetail from '../pages/PropertyDetail'
import BookingPayment from '../pages/BookingPayment'
import ProtectedRoute from '../modules/auth/components/ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/add-property" element={<ProtectedRoute roles={['owner', 'admin']}><AddProperty /></ProtectedRoute>} />
      <Route path="/properties/:id/edit" element={<ProtectedRoute roles={['owner', 'admin']}><AddProperty /></ProtectedRoute>} />
      <Route path="/properties" element={<AllProperties />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/booking-payment" element={<BookingPayment />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
