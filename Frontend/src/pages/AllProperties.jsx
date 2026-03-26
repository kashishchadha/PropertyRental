import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../modules/auth/store/useAuthStore'
import { propertyApi } from '../modules/property/services/propertyApi'
import p1 from '../assets/p1.avif'
import p2 from '../assets/p2.avif'
import p3 from '../assets/p3.avif'
import p4 from '../assets/p4.avif'
import p5 from '../assets/p5.avif'
import p6 from '../assets/p6.avif'

const propertyImages = [p1, p2, p3, p4, p5, p6]

function PropertiesTopbar() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = Boolean(user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <Link to="/" className="text-xl font-bold text-(--color-ink)">EstateConcierge</Link>
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
    </header>
  )
}

function FilterSidebar({ filters, onFilterChange, onApplyFilters, onResetFilters, canManage }) {
  return (
    <aside className="hidden border-r border-slate-200 bg-[#e9edf2] p-4 lg:block">
      <div className="mb-5">
        <p className="text-xl font-bold text-(--color-primary)">Filters</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--color-secondary)">Refine Search</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">City</label>
          <input
            type="text"
            value={filters.city}
            onChange={(event) => onFilterChange('city', event.target.value)}
            placeholder="e.g. Tokyo"
            className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">Min Price</label>
          <input
            type="number"
            min="0"
            value={filters.min_price}
            onChange={(event) => onFilterChange('min_price', event.target.value)}
            placeholder="0"
            className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">Max Price</label>
          <input
            type="number"
            min="0"
            value={filters.max_price}
            onChange={(event) => onFilterChange('max_price', event.target.value)}
            placeholder="20000"
            className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">Min Guests</label>
          <input
            type="number"
            min="1"
            value={filters.min_guests}
            onChange={(event) => onFilterChange('min_guests', event.target.value)}
            placeholder="1"
            className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={onApplyFilters} className="rounded-lg bg-[#0d1b36] px-3 py-2 text-sm font-semibold text-white">
          Apply
        </button>
        <button type="button" onClick={onResetFilters} className="rounded-lg border border-slate-400 px-3 py-2 text-sm font-semibold text-slate-700">
          Reset
        </button>
      </div>

      {canManage ? (
        <Link to="/add-property" className="mt-10 block rounded-xl bg-[#0d1b36] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#13264a]">
          + Add Property
        </Link>
      ) : null}
    </aside>
  )
}

function PropertyCard({ property, index, canManage, canEdit, onDelete }) {
  const image = propertyImages[index % propertyImages.length]

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-44">
        <img src={image} alt={property.title} className="h-full w-full object-cover" />
      </div>

      <div className="p-3.5">
        <h3 className="text-2xl font-semibold leading-tight text-(--color-ink)">{property.title}</h3>
        <p className="mt-1 text-sm text-(--color-secondary)">{property.city}</p>
        <p className="mt-1 text-sm text-(--color-secondary)">{property.address}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">Per Night</p>
            <p className="text-4xl font-bold text-(--color-primary)">${Number(property.price_per_night).toLocaleString()}</p>
          </div>
          <Link to={`/properties/${property.id}`} className="rounded-lg bg-[#e9eff6] px-4 py-2 text-sm font-semibold text-(--color-secondary)">
            View Details
          </Link>
        </div>

        {canManage ? (
          <div className="mt-4 flex items-center gap-2">
            {canEdit ? (
              <Link to={`/properties/${property.id}/edit`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700">
                Edit
              </Link>
            ) : null}
            {canEdit ? (
              <button
                type="button"
                onClick={() => onDelete(property.id)}
                className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
              >
                Delete
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function AllProperties() {
  const user = useAuthStore((state) => state.user)
  const canManage = user?.role === 'owner' || user?.role === 'admin'

  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ city: '', min_price: '', max_price: '', min_guests: '' })
  const [activeFilters, setActiveFilters] = useState({})

  const loadProperties = async (query = {}) => {
    try {
      setIsLoading(true)
      setError('')
      const data = await propertyApi.list(query)
      setProperties(data)
    } catch (err) {
      setError(err.message || 'Failed to load properties')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProperties(activeFilters)
  }, [activeFilters])

  const handleFilterChange = (field, value) => {
    setFilters((previous) => ({ ...previous, [field]: value }))
  }

  const handleApplyFilters = () => {
    const nextFilters = {}
    if (filters.city.trim()) nextFilters.city = filters.city.trim()
    if (filters.min_price !== '') nextFilters.min_price = Number(filters.min_price)
    if (filters.max_price !== '') nextFilters.max_price = Number(filters.max_price)
    if (filters.min_guests !== '') nextFilters.min_guests = Number(filters.min_guests)
    setActiveFilters(nextFilters)
  }

  const handleResetFilters = () => {
    setFilters({ city: '', min_price: '', max_price: '', min_guests: '' })
    setActiveFilters({})
  }

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm('Delete this property? This action cannot be undone.')
    if (!confirmed) return

    try {
      await propertyApi.remove(propertyId)
      setProperties((previous) => previous.filter((property) => property.id !== propertyId))
    } catch (err) {
      window.alert(err.message || 'Failed to delete property')
    }
  }

  const visibleProperties = useMemo(() => properties, [properties])

  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <PropertiesTopbar />

      <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[240px_1fr]">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
          canManage={canManage}
        />

        <main className="px-6 py-6">
          <div className="mb-5">
            <h1 className="text-4xl font-bold text-(--color-ink)">Available Properties</h1>
            <p className="mt-1 text-base text-(--color-secondary)">Live inventory from your backend.</p>
          </div>

          {isLoading ? <p className="text-sm text-slate-500">Loading properties...</p> : null}
          {error ? <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

          {!isLoading && !error && visibleProperties.length === 0 ? (
            <p className="rounded-lg bg-white px-4 py-3 text-sm text-slate-600">No properties found for current filters.</p>
          ) : null}

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProperties.map((property, index) => {
              const canEdit = user?.role === 'admin' || user?.sub === property.owner_id || user?.id === property.owner_id

              return (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  canManage={canManage}
                  canEdit={canEdit}
                  onDelete={handleDelete}
                />
              )
            })}
          </section>
        </main>
      </div>
    </div>
  )
}

export default AllProperties
