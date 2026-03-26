import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../modules/auth/store/useAuthStore'
import d1 from '../assets/d1.png'
import d2 from '../assets/d2.png'
import d3 from '../assets/d3.png'
import d4 from '../assets/d4.png'
import d5 from '../assets/d5.png'

const amenities = [
  'Infinity Pool',
  'Private Lounge',
  'Elite Gym',
  'Secured Parking',
  'Fiber Optic WiFi',
  '24/7 Concierge',
]

const highlights = [
  { label: 'Bedrooms', value: '4 Ensuite' },
  { label: 'Bathrooms', value: '5.5 Luxury' },
  { label: 'Area', value: '4,250 sqft' },
]

const reviews = [
  {
    name: 'Marcus Thompson',
    date: 'October 2023',
    text: 'Beyond expectations. The concierge service handled our last-minute theater bookings perfectly. The views are truly the best in London.',
  },
  {
    name: 'Sophia Chen',
    date: 'August 2023',
    text: "A masterpiece of design. The kitchen is a chef's dream and the master suite feels like a 7-star hotel. Simply impeccable.",
  },
]

function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      className="h-4 w-4"
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : '1.8'}
    >
      <path d="M12 21s-6.7-4.3-9.2-8.1C1 10.2 1.6 6.8 4.2 5.3C6.5 4 9.2 4.7 11 6.7L12 7.8L13 6.7C14.8 4.7 17.5 4 19.8 5.3C22.4 6.8 23 10.2 21.2 12.9C18.7 16.7 12 21 12 21Z" />
    </svg>
  )
}

function PropertyDetail() {
  const [isSaved, setIsSaved] = useState(false)
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = Boolean(user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-(--color-ink)">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold">EstateConcierge</Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-(--color-secondary) md:flex">
            <Link to="/properties" className="border-b-2 border-(--color-primary) pb-1 text-(--color-primary)">Properties</Link>
            <Link to="/dashboard" className="hover:text-(--color-ink)">Management</Link>
            <a href="#" className="hover:text-(--color-ink)">Company</a>
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

      <main className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Properties  .  Luxury Collection  .  The Obsidian Penthouse
        </p>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">The Obsidian Penthouse</h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-(--color-secondary)">
              <span className="font-semibold text-(--color-primary)">★ 4.98</span>
              <span>(128 reviews)</span>
              <span>•</span>
              <span>Mayfair, London, UK</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <span>⤴</span>
              Share
            </button>
            <button
              type="button"
              onClick={() => setIsSaved((previous) => !previous)}
              aria-label={isSaved ? 'Unsave property' : 'Save property'}
              className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold ${isSaved ? 'text-rose-500' : 'text-slate-600'} hover:bg-slate-50`}
            >
              <HeartIcon filled={isSaved} />
              Save
            </button>
          </div>
        </div>

        <section className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <img src={d1} alt="Living room view" className="h-[240px] w-full rounded-2xl object-cover md:h-[360px] lg:row-span-2 lg:h-[520px]" />
          <img src={d2} alt="Modern kitchen" className="h-[170px] w-full rounded-2xl object-cover md:h-[250px]" />
          <img src={d3} alt="Master bedroom" className="h-[170px] w-full rounded-2xl object-cover md:h-[250px]" />
          <img src={d4} alt="Rooftop terrace" className="h-[170px] w-full rounded-2xl object-cover md:h-[250px]" />
          <div className="relative">
            <img src={d5} alt="Poolside view" className="h-[170px] w-full rounded-2xl object-cover md:h-[250px]" />
            <button type="button" className="absolute bottom-3 right-3 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-700 shadow">
              View all photos
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_330px]">
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <p className="text-[11px] font-semibold text-slate-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>

            <article className="mt-8 border-t border-slate-200 pt-7">
              <h2 className="text-3xl font-bold">Experience Unrivaled Opulence</h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Welcome to The Obsidian Penthouse, a triumph of contemporary architecture and bespoke interior design. Perched atop one of Mayfair's most prestigious buildings, this residence offers a curated lifestyle for the most discerning global traveler.
              </p>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                The interior palette features honed Nero Marquina marble, wire-brushed oak, and hand-applied Venetian plaster. Every window frame serves as a picture frame, capturing the dynamic energy of London from sunrise to the late-night city glow.
              </p>
              <button type="button" className="mt-4 text-sm font-semibold text-(--color-primary) hover:text-(--color-primary-strong)">
                Show more →
              </button>
            </article>

            <section className="mt-8 border-t border-slate-200 pt-7">
              <h2 className="text-3xl font-bold">World-Class Amenities</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map((amenity) => (
                  <div key={amenity} className="rounded-2xl bg-white px-4 py-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700">{amenity}</p>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-5 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
                View all 32 amenities
              </button>
            </section>

            <section className="mt-9 border-t border-slate-200 pt-7">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Client Experiences</h2>
                <p className="text-lg font-semibold text-(--color-primary)">★ 4.98</p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {reviews.map((review) => (
                  <article key={review.name} className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">{review.name}</p>
                    <p className="text-xs text-slate-400">{review.date}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">"{review.text}"</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-4xl font-bold text-(--color-primary)">£2,450</p>
                <p className="pt-2 text-sm text-slate-500">/ night</p>
                <p className="ml-auto pt-2 text-sm font-semibold text-(--color-primary)">★ 4.98</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-200 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Check-in</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">12/10/2024</p>
                </div>
                <div className="rounded-xl border border-slate-200 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Check-out</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">15/10/2024</p>
                </div>
              </div>

              <div className="mt-2 rounded-xl border border-slate-200 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Guests</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">2 Guests</p>
              </div>

              <Link to="/booking-payment" className="btn-primary-theme mt-4 block w-full rounded-xl py-3 text-center text-base font-semibold shadow-lg shadow-blue-900/20">
                Book Now
              </Link>

              <p className="mt-3 text-center text-xs text-slate-400">You won't be charged yet</p>

              <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>£2,450 × 3 nights</span>
                  <span>£7,350</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cleaning fee</span>
                  <span>£250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Concierge service</span>
                  <span>£450</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200" />
                <div className="flex items-center justify-between pt-1 text-base font-bold text-slate-800">
                  <span>Total</span>
                  <span className="text-(--color-primary)">£8,050</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Concierge Protection</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                This property is managed by our Premium Elite team, ensuring verified quality and 24/7 priority support.
              </p>
            </div>
          </aside>
        </section>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 py-6 text-xs text-slate-400">
          <p>© 2024 EstateConcierge. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
            <a href="#">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default PropertyDetail
