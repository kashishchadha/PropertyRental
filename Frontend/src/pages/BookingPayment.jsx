import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { bookingApi } from '../modules/booking/services/bookingApi'
import { paymentApi } from '../modules/payment/services/paymentApi'
import { propertyApi } from '../modules/property/services/propertyApi'
import d5 from '../assets/d5.png'

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" />
    </svg>
  )
}

const formatDate = (value) => {
  if (!value) return 'N/A'
  return new Date(value).toLocaleDateString()
}

function BookingPayment() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [booking, setBooking] = useState(null)
  const [property, setProperty] = useState(null)
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [isPaying, setIsPaying] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')

      const bookings = await bookingApi.listMine()
      const currentBooking = bookings.find((item) => Number(item.id) === Number(bookingId))

      if (!currentBooking) {
        throw new Error('Booking not found or access denied')
      }

      const [propertyData, paymentsData] = await Promise.all([
        propertyApi.getById(currentBooking.property_id),
        paymentApi.listByBooking(bookingId)
      ])

      setBooking(currentBooking)
      setProperty(propertyData)
      setPayments(paymentsData)
    } catch (err) {
      setError(err.message || 'Failed to load booking details')
    } finally {
      setIsLoading(false)
    }
  }, [bookingId])

  useEffect(() => {
    loadData()
  }, [loadData, searchParams])

  const hasPaid = useMemo(() => payments.some((payment) => payment.status === 'paid'), [payments])

  const totalAmount = Number(booking?.total_amount || 0)
  const startDate = booking?.start_date
  const endDate = booking?.end_date
  const nights = startDate && endDate
    ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    : 0

  const handlePay = async () => {
    setPaymentError('')

    try {
      setIsPaying(true)
      const checkoutSession = await paymentApi.createStripeCheckoutSession({
        booking_id: Number(bookingId),
        success_url: `${window.location.origin}/booking-payment/${bookingId}?payment=success`,
        cancel_url: `${window.location.origin}/booking-payment/${bookingId}?payment=cancelled`
      })

      if (!checkoutSession?.url) {
        throw new Error('Failed to initialize Stripe checkout')
      }

      window.location.assign(checkoutSession.url)
    } catch (err) {
      setPaymentError(err.message || 'Payment failed')
    } finally {
      setIsPaying(false)
    }
  }

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading booking...</div>
  }

  if (error || !booking || !property) {
    return (
      <div className="p-6">
        <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error || 'Booking not found'}</p>
        <Link to="/properties" className="mt-4 inline-block text-sm font-semibold text-(--color-primary)">Back to properties</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f1f3f7] text-(--color-ink)">
      <div className="flex h-8 items-center bg-[#121821] px-4 text-sm font-semibold text-slate-200 sm:px-6 lg:px-8">
        Booking & Payment
      </div>

      <main className="mx-auto max-w-7xl rounded-t-xl bg-[#f6f8fb] px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link to="/" className="text-lg font-bold">EstateConcierge</Link>
          <button type="button" onClick={() => navigate(-1)} className="text-sm font-semibold text-slate-500 hover:text-slate-700">Back</button>
        </div>

        <section className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight">Complete your booking</h1>
          <p className="mt-1 text-sm text-slate-500">Live booking #{booking.id} synchronized with backend data.</p>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <article className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex gap-4">
                <img src={d5} alt={property.title} className="h-24 w-24 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h2 className="mt-2 text-2xl font-bold">{property.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{property.city}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">Status: {booking.status}</span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-(--color-primary)">Booking ID: {booking.id}</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="text-base font-bold text-(--color-primary)">Booking Details</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Dates</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{formatDate(startDate)} - {formatDate(endDate)}</p>
                  <p className="text-xs text-slate-400">{nights} nights total</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Amount</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">${totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">Auto-calculated by backend</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold">Payment History</p>
              {payments.length === 0 ? <p className="mt-1 text-xs leading-5 text-slate-500">No payment records yet.</p> : null}
              <div className="mt-2 space-y-2">
                {payments.map((payment) => (
                  <div key={payment.id} className="rounded-lg border border-slate-200 px-3 py-2 text-xs">
                    <p className="font-semibold text-slate-700">{payment.provider} • {payment.status}</p>
                    <p className="text-slate-500">Ref: {payment.provider_ref}</p>
                    <p className="text-slate-500">Amount: ${Number(payment.amount).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold">Price Summary</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>${Number(property.price_per_night).toLocaleString()} × {nights} nights</span><span>${totalAmount.toLocaleString()}</span></div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="text-sm font-semibold text-slate-700">Total (USD)</span>
              <span className="text-3xl font-bold text-(--color-primary)">${totalAmount.toLocaleString()}</span>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-bold">Stripe Checkout</h4>
              <p className="mt-2 text-sm text-slate-500">You will be redirected to Stripe's secure hosted checkout page.</p>
            </div>

            {paymentError ? <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{paymentError}</p> : null}
            {hasPaid ? <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">This booking is already paid.</p> : null}
            {searchParams.get('payment') === 'success' ? <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">Returned from Stripe. Payment confirmation may take a few seconds.</p> : null}
            {searchParams.get('payment') === 'cancelled' ? <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">Stripe checkout was cancelled. You can retry payment anytime.</p> : null}

            <button
              type="button"
              onClick={handlePay}
              disabled={isPaying || hasPaid}
              className="btn-primary-theme mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold shadow-lg shadow-blue-900/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <IconLock />
              {isPaying ? 'Processing...' : `Pay $${totalAmount.toLocaleString()}`}
            </button>

            <p className="mt-3 text-[11px] leading-4 text-slate-400">
              Payment is processed through Stripe and synchronized via webhook confirmation.
            </p>
          </aside>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-400">© 2024 EstateConcierge. All rights reserved.</footer>
      </main>
    </div>
  )
}

export default BookingPayment
