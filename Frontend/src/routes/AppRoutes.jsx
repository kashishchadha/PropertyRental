import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import AddProperty from '../pages/AddProperty'
import AllProperties from '../pages/AllProperties'
import PropertyDetail from '../pages/PropertyDetail'
import BookingPayment from '../pages/BookingPayment'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/properties" element={<AllProperties />} />
      <Route path="/properties/obsidian-penthouse" element={<PropertyDetail />} />
      <Route path="/booking-payment" element={<BookingPayment />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
