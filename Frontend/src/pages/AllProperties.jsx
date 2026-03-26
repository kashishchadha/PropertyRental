import { useState } from 'react'
import { Link } from 'react-router-dom'
import p1 from '../assets/p1.avif'
import p2 from '../assets/p2.avif'
import p3 from '../assets/p3.avif'
import p4 from '../assets/p4.avif'
import p5 from '../assets/p5.avif'
import p6 from '../assets/p6.avif'

const cards = [
  { id: 1, title: 'Azure Horizon Villa', location: 'Malibu, California', rent: '$12,500', rating: '4.9', tag: 'Featured', image: p1 },
  { id: 2, title: 'The Obsidian Loft', location: 'Manhattan, NY', rent: '$8,900', rating: '5.0', tag: 'New Listing', image: p2 },
  { id: 3, title: 'Serene Nordic Retreat', location: 'Aspen, Colorado', rent: '$15,200', rating: '4.8', tag: '', image: p3 },
  { id: 4, title: 'Villa Tuscany', location: 'Florence, Italy', rent: '$6,400', rating: '4.7', tag: '', image: p4 },
  { id: 5, title: 'Geometric Heights', location: 'Tokyo, Japan', rent: '$7,200', rating: '4.9', tag: '', image: p5 },
  { id: 6, title: 'Clifftop Palace', location: 'Santorini, Greece', rent: '$18,000', rating: '5.0', tag: '', image: p6 },
]

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21C16.2 16.8 18.5 13.7 18.5 10.5C18.5 6.9 15.6 4 12 4C8.4 4 5.5 6.9 5.5 10.5C5.5 13.7 7.8 16.8 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-amber-500">
      <path d="M12 3.8L14.5 8.9L20.2 9.7L16.1 13.7L17.1 19.3L12 16.6L6.9 19.3L7.9 13.7L3.8 9.7L9.5 8.9L12 3.8Z" />
    </svg>
  )
}

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

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.5 20H19.5" />
      <rect x="7" y="4" width="10" height="16" rx="1.5" />
      <path d="M10 8H10.1M14 8H14.1M10 12H10.1M14 12H14.1M10 16H10.1M14 16H14.1" />
    </svg>
  )
}

function FilterCheck({ label, checked = false }) {
  return (
    <label className="flex items-center gap-2 text-sm text-[var(--color-secondary)]">
      <span className={checked ? 'inline-flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'inline-flex h-4 w-4 items-center justify-center rounded-sm border border-slate-300 bg-transparent'}>
        {checked ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="3">
            <path d="M5 12L10 17L19 8" />
          </svg>
        ) : null}
      </span>
      {label}
    </label>
  )
}

function PropertiesTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <Link to="/" className="text-xl font-bold text-[var(--color-ink)]">EstateConcierge</Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--color-secondary)] md:flex">
        <a href="#" className="border-b-2 border-[var(--color-primary)] pb-1 text-[var(--color-primary)]">Properties</a>
        <a href="#" className="hover:text-[var(--color-ink)]">Management</a>
        <a href="#" className="hover:text-[var(--color-ink)]">Company</a>
      </nav>
      <div className="flex items-center gap-3 text-sm font-semibold">
        <Link to="/login" className="text-[var(--color-secondary)] hover:text-[var(--color-ink)]">Login</Link>
        <Link to="/signup" className="btn-primary-theme rounded-full px-4 py-2 text-xs">Sign Up</Link>
      </div>
    </header>
  )
}

function FilterSidebar() {
  const minPrice = 1500
  const maxPrice = 15000
  const [price, setPrice] = useState(8500)
  const progress = ((price - minPrice) / (maxPrice - minPrice)) * 100

  return (
    <aside className="hidden border-r border-slate-200 bg-[#e9edf2] p-4 lg:block">
      <div className="mb-5">
        <p className="text-xl font-bold text-[var(--color-primary)]">Management</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">Premium Suite</p>
      </div>

      <div className="space-y-1 border-b border-slate-200 pb-3">
        <button type="button" className="flex h-11 w-full items-center gap-2 rounded-xl bg-white px-3 text-sm font-semibold text-[var(--color-primary)]">
          <GridIcon />
          Overview
        </button>
        <button type="button" className="flex h-11 w-full items-center gap-2 rounded-xl px-3 text-sm font-medium text-[var(--color-secondary)]">
          <BuildingIcon />
          Properties
        </button>
      </div>

      <div className="mt-4 border-b border-slate-200 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">Price Range</p>
        <div className="mt-3 px-1">
          <div className="relative h-5">
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-300" />
            <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--color-primary)]" style={{ width: `${progress}%` }} />
            <div className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--color-primary)] shadow" style={{ left: `${progress}%` }} />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              aria-label="Price range"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[var(--color-secondary)]">
          <span>$1,500</span>
          <span>$15,000+</span>
        </div>
      </div>

      <div className="mt-4 border-b border-slate-200 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">Property Type</p>
        <div className="mt-2 space-y-1.5">
          <FilterCheck label="Luxury Villas" checked />
          <FilterCheck label="Modern Lofts" />
          <FilterCheck label="Penthouses" />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">Amenities</p>
        <div className="mt-2 space-y-1.5">
          <FilterCheck label="Infinity Pool" />
          <FilterCheck label="Private Gym" />
          <FilterCheck label="Concierge" />
        </div>
      </div>

      <Link to="/add-property" className="mt-14 block rounded-xl bg-[#0d1b36] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#13264a]">
        + Add Property
      </Link>
    </aside>
  )
}

function PropertyCard({ card }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44">
        <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
        {card.tag ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">
            {card.tag}
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => setIsFavorite((previous) => !previous)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 ${isFavorite ? 'text-rose-500' : 'text-slate-500'}`}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-2xl font-semibold leading-tight text-[var(--color-ink)]">{card.title}</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-[var(--color-secondary)]">
            <StarIcon />
            {card.rating}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-[var(--color-secondary)]">
          <MapPinIcon />
          {card.location}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">Monthly Rent</p>
            <p className="text-4xl font-bold text-[var(--color-primary)]">{card.rent}</p>
          </div>
          <Link to="/properties/obsidian-penthouse" className="rounded-lg bg-[#e9eff6] px-4 py-2 text-sm font-semibold text-[var(--color-secondary)]">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

function AllProperties() {
  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <PropertiesTopbar />

      <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[240px_1fr]">
        <FilterSidebar />

        <main className="px-6 py-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[var(--color-ink)]">Curated Collections</h1>
              <p className="mt-1 text-base text-[var(--color-secondary)]">
                Discover hand-picked premium residences managed by the finest global concierges.
              </p>
            </div>
            <div className="rounded-full bg-[#dde5ee] p-1 text-sm font-semibold">
              <button className="rounded-full bg-white px-4 py-1.5 text-[var(--color-primary)]">Grid</button>
              <button className="rounded-full px-4 py-1.5 text-[var(--color-secondary)]">Map View</button>
            </div>
          </div>

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <PropertyCard key={card.id} card={card} />
            ))}
          </section>

          <footer className="mt-14 flex items-center justify-between text-xs text-[var(--color-secondary)]">
            <p>© 2024 EstateConcierge. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
              <a href="#">Contact</a>
            </div>
          </footer>

          <button
            type="button"
            className="fixed bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg shadow-blue-700/25"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M13 2L6 13H11L10 22L18 10H13L13 2Z" />
            </svg>
          </button>
        </main>
      </div>
    </div>
  )
}

export default AllProperties
