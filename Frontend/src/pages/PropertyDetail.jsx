import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../modules/auth/store/useAuthStore'
import { propertyApi } from '../modules/property/services/propertyApi'
import { bookingApi } from '../modules/booking/services/bookingApi'
import { api } from '../services/api'
import p1 from '../assets/p1.avif'
import p2 from '../assets/p2.avif'
import p3 from '../assets/p3.avif'
import p4 from '../assets/p4.avif'
import p5 from '../assets/p5.avif'

const gallery = [p1, p2, p3, p4, p5]

function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const isAuthenticated = Boolean(user)

  const [property, setProperty] = useState(null)
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState('')

  const canEdit = useMemo(() => {
    if (!user || !property) return false
    return user.role === 'admin' || user.id === property.owner_id
  }, [property, user])

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        setError('')

        const [propertyData, reviewsResponse] = await Promise.all([
          propertyApi.getById(id),
          api.get(`/reviews/property/${id}`).catch(() => ({ data: [] }))
        ])

        setProperty(propertyData)
        setReviews(reviewsResponse?.data || [])
      } catch (err) {
        setError(err.message || 'Failed to load property')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [id])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this property? This action cannot be undone.')
    if (!confirmed) return

    try {
      await propertyApi.remove(id)
      navigate('/properties')
    } catch (err) {
      window.alert(err.message || 'Failed to delete property')
    }
  }

  const canBook = isAuthenticated && (user.role === 'tenant' || user.role === 'admin')

  const handleCreateBooking = async () => {
    setBookingError('')

    if (!canBook) {
      setBookingError('Please login as tenant/admin to create a booking.')
      return
    }

    if (!checkIn || !checkOut) {
      setBookingError('Please select both check-in and check-out dates.')
      return
    }

    try {
      setIsBooking(true)
      const booking = await bookingApi.create({
        property_id: Number(property.id),
        start_date: checkIn,
        end_date: checkOut
      })

      navigate(`/booking-payment/${booking.id}`)
    } catch (err) {
      setBookingError(err.message || 'Failed to create booking')
    } finally {
      setIsBooking(false)
    }
  }

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading property...</div>
  }

  if (error || !property) {
    return (
      <div className="p-6">
        <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error || 'Property not found'}</p>
        <Link to="/properties" className="mt-4 inline-block text-sm font-semibold text-(--color-primary)">Back to properties</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-(--color-ink)">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-310 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold">EstateConcierge</Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-(--color-secondary) md:flex">
            <Link to="/properties" className="border-b-2 border-(--color-primary) pb-1 text-(--color-primary)">Properties</Link>
            <Link to="/dashboard" className="hover:text-(--color-ink)">Management</Link>
          </nav>

          <div className="flex items-center gap-3 text-sm font-semibold">
            {isAuthenticated ? (
              <>
                <span className="hidden text-(--color-secondary) md:inline">Hi, {user.name}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-slate-300 px-4 py-2 text-xs text-(--color-secondary) hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-(--color-secondary) hover:text-(--color-ink)">Login</Link>
                <Link to="/signup" className="btn-primary-theme rounded-full px-4 py-2 text-xs">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-310 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Properties . Listing #{property.id}</p>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{property.title}</h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-(--color-secondary)">
              <span>{property.city}</span>
              <span>•</span>
              <span>{property.address}</span>
            </div>
          </div>

          {canEdit ? (
            <div className="flex items-center gap-2">
              <Link to={`/properties/${property.id}/edit`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Edit
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>

        <section className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <img src={gallery[0]} alt="Property" className="h-60 w-full rounded-2xl object-cover md:h-90 lg:row-span-2 lg:h-130" />
          <img src={gallery[1]} alt="Property" className="h-42.5 w-full rounded-2xl object-cover md:h-62.5" />
          <img src={gallery[2]} alt="Property" className="h-42.5 w-full rounded-2xl object-cover md:h-62.5" />
          <img src={gallery[3]} alt="Property" className="h-42.5 w-full rounded-2xl object-cover md:h-62.5" />
          <img src={gallery[4]} alt="Property" className="h-42.5 w-full rounded-2xl object-cover md:h-62.5" />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_330px]">
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold text-slate-400">Bedrooms</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{property.bedrooms}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold text-slate-400">Bathrooms</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{property.bathrooms}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold text-slate-400">Max Guests</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{property.max_guests}</p>
              </div>
            </div>

            <article className="mt-8 border-t border-slate-200 pt-7">
              <h2 className="text-3xl font-bold">Property Description</h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">{property.description || 'No description provided yet.'}</p>
              <p className="mt-3 text-sm text-slate-500">Owner: {property.owner_name || 'N/A'}</p>
            </article>

            <section className="mt-9 border-t border-slate-200 pt-7">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Reviews</h2>
                <p className="text-sm font-semibold text-(--color-primary)">{reviews.length} total</p>
              </div>

              {reviews.length === 0 ? <p className="mt-4 text-sm text-slate-500">No reviews yet.</p> : null}

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {reviews.map((review) => (
                  <article key={review.id} className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">{review.tenant_name || 'Guest'}</p>
                    <p className="text-xs text-slate-400">Rating: {review.rating}/5</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment || 'No comment provided.'}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-4xl font-bold text-(--color-primary)">${Number(property.price_per_night).toLocaleString()}</p>
                <p className="pt-2 text-sm text-slate-500">/ night</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Check-in
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-2 text-sm"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Check-out
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(event) => setCheckOut(event.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-2 text-sm"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={handleCreateBooking}
                disabled={isBooking}
                className="btn-primary-theme mt-4 block w-full rounded-xl py-3 text-center text-base font-semibold shadow-lg shadow-blue-900/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isBooking ? 'Creating booking...' : 'Book Now'}
              </button>

              {!isAuthenticated ? <p className="mt-3 text-center text-xs text-slate-400">Login required to create booking.</p> : null}
              {isAuthenticated && !canBook ? <p className="mt-3 text-center text-xs text-slate-400">Owner accounts cannot create tenant bookings.</p> : null}
              {bookingError ? <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{bookingError}</p> : null}
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default PropertyDetail
