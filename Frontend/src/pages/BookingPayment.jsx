import { Link } from 'react-router-dom'
import d5 from '../assets/d5.png'

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
      <path d="M3 12h18" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l7 3.5V12c0 4.8-3 7.8-7 9-4-1.2-7-4.2-7-9V6.5L12 3z" />
      <path d="M9.5 12.5l1.8 1.8 3.2-3.2" />
    </svg>
  )
}

function BookingPayment() {
  return (
    <div className="min-h-screen bg-[#f1f3f7] text-(--color-ink)">
      <div className="flex h-8 items-center bg-[#121821] px-4 text-sm font-semibold text-slate-200 sm:px-6 lg:px-8">
        ← Booking &amp; Payment
      </div>

      <main className="mx-auto max-w-7xl rounded-t-xl bg-[#f6f8fb] px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link to="/" className="text-lg font-bold">EstateConcierge</Link>
          <Link to="/properties" className="text-sm font-semibold text-slate-500 hover:text-slate-700">← Back to Properties</Link>
        </div>

        <section className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight">Complete your booking</h1>
          <p className="mt-1 text-sm text-slate-500">Review your details and finalize your secure payment.</p>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <article className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex gap-4">
                <img src={d5} alt="The Azure Penthouse" className="h-24 w-24 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-(--color-primary)">Premium Managed</p>
                  <h2 className="mt-2 text-2xl font-bold">The Azure Penthouse</h2>
                  <p className="mt-1 text-sm text-slate-500">Manhattan, New York City</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">★ 4.9 (128 reviews)</span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-(--color-primary)">Verified</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="text-base font-bold text-(--color-primary)">Booking Details</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Dates</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">Oct 24 - Oct 31, 2024</p>
                      <p className="text-xs text-slate-400">7 nights total</p>
                    </div>
                    <button type="button" className="text-xs font-semibold text-(--color-primary)">Edit</button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Guests</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">2 Adults, 1 Pet</p>
                      <p className="text-xs text-slate-400">Maximum occupancy: 4</p>
                    </div>
                    <button type="button" className="text-xs font-semibold text-(--color-primary)">Edit</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200">
                <p className="border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500">Concierge Services Selected</p>
                <div className="flex items-center justify-between px-3 py-3 text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <IconBriefcase />
                    Airport Transfer (Tesla Model X)
                  </span>
                  <span className="font-semibold text-(--color-primary)">$85.00</span>
                </div>
                <div className="border-t border-slate-200" />
                <div className="flex items-center justify-between px-3 py-3 text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <IconBriefcase />
                    Daily Turndown Service
                  </span>
                  <span className="font-semibold text-(--color-primary)">$120.00</span>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold">Cancellation policy</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Free cancellation before Oct 17. After that, cancel before check-in on Oct 24 and get a 50% refund, minus the service fee.
              </p>
            </article>
          </div>

          <aside className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold">Price Summary</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>$450.00 × 7 nights</span><span>$3,150.00</span></div>
              <div className="flex items-center justify-between"><span>Concierge Add-ons</span><span>$205.00</span></div>
              <div className="flex items-center justify-between"><span>Service fee</span><span>$142.20</span></div>
              <div className="flex items-center justify-between"><span>Occupancy taxes</span><span>$48.50</span></div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="text-sm font-semibold text-slate-700">Total (USD)</span>
              <span className="text-3xl font-bold text-(--color-primary)">$3,545.70</span>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-bold">Payment Method</h4>
              <div className="mt-3 space-y-3">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Cardholder Name
                  <input type="text" value="Jane Doe" readOnly className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700" />
                </label>

                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Card Number
                  <div className="relative mt-1">
                    <input type="text" value="0000 0000 0000 0000" readOnly className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 pr-10 text-sm text-slate-700" />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▣</span>
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Expiration
                    <input type="text" value="MM / YY" readOnly className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700" />
                  </label>
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    CVC
                    <input type="text" value="123" readOnly className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700" />
                  </label>
                </div>
              </div>
            </div>

            <button type="button" className="btn-primary-theme mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold shadow-lg shadow-blue-900/20">
              <IconLock />
              Pay $3,545.70
            </button>

            <p className="mt-3 text-[11px] leading-4 text-slate-400">
              By clicking this button above, you agree to our Terms of Service and Privacy Policy. Secure payments processed by EstateConcierge Systems.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Safe & Encrypted Checkout</p>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">Need help with booking? Your concierge is online now.</p>
              <button type="button" className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">Chat Now</button>
            </div>
          </aside>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-400">© 2024 EstateConcierge. All rights reserved.</footer>
      </main>
    </div>
  )
}

export default BookingPayment
