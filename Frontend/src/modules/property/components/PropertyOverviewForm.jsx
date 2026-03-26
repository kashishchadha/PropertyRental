import { useEffect, useState } from 'react'
import globeImage from '../../../assets/globe.png'

const initialFormState = {
  title: '',
  description: '',
  city: '',
  address: '',
  price_per_night: '',
  bedrooms: 1,
  bathrooms: 1,
  max_guests: 1,
  is_active: true
}

function NumberControl({ label, value, onIncrement, onDecrement, min = 0 }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">{label}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-4xl font-bold text-(--color-ink)">{value}</p>
        <div className="space-y-1">
          <button type="button" onClick={onIncrement} className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-(--color-primary)">+</button>
          <button
            type="button"
            onClick={onDecrement}
            disabled={Number(value) <= min}
            className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-40"
          >
            -
          </button>
        </div>
      </div>
    </div>
  )
}

function PropertyOverviewForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save Property',
  error = ''
}) {
  const [form, setForm] = useState(() => ({ ...initialFormState, ...(initialValues || {}) }))

  useEffect(() => {
    setForm({ ...initialFormState, ...(initialValues || {}) })
  }, [initialValues])

  const setField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const increment = (field) => setField(field, Number(form[field]) + 1)
  const decrement = (field, min) => setField(field, Math.max(min, Number(form[field]) - 1))

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      price_per_night: Number(form.price_per_night),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      max_guests: Number(form.max_guests),
      is_active: Boolean(form.is_active)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 xl:grid-cols-[1fr_300px]">
      <div className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div>
            <label className="text-sm font-semibold text-(--color-ink)">Property Title</label>
            <input
              required
              type="text"
              value={form.title}
              onChange={(event) => setField('title', event.target.value)}
              placeholder="e.g., Azure Horizon Penthouse"
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#edf1f5] px-4 text-base outline-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-(--color-ink)">Description</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(event) => setField('description', event.target.value)}
              placeholder="Describe the highlights and amenities..."
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-[#edf1f5] p-4 text-base text-(--color-secondary) outline-none"
            />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-(--color-ink)">City</label>
              <input
                required
                type="text"
                value={form.city}
                onChange={(event) => setField('city', event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#edf1f5] px-4 text-base outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-(--color-ink)">Address</label>
              <input
                required
                type="text"
                value={form.address}
                onChange={(event) => setField('address', event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#edf1f5] px-4 text-base outline-none"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-(--color-ink)">Price Per Night</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price_per_night}
                onChange={(event) => setField('price_per_night', event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#edf1f5] px-4 text-base outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-(--color-ink)">Listing Status</label>
              <select
                value={form.is_active ? 'active' : 'inactive'}
                onChange={(event) => setField('is_active', event.target.value === 'active')}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#edf1f5] px-4 text-base outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <NumberControl
            label="Bedrooms"
            value={form.bedrooms}
            onIncrement={() => increment('bedrooms')}
            onDecrement={() => decrement('bedrooms', 0)}
            min={0}
          />
          <NumberControl
            label="Bathrooms"
            value={form.bathrooms}
            onIncrement={() => increment('bathrooms')}
            onDecrement={() => decrement('bathrooms', 0)}
            min={0}
          />
          <NumberControl
            label="Max Guests"
            value={form.max_guests}
            onIncrement={() => increment('max_guests')}
            onDecrement={() => decrement('max_guests', 1)}
            min={1}
          />
        </section>

        {error ? <p className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</p> : null}

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary-theme rounded-xl px-8 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : submitLabel}
          </button>
        </div>
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-2xl font-bold text-(--color-ink)">Preview</h3>
          <p className="mt-3 text-sm text-(--color-secondary)">{form.title || 'Property title will appear here'}</p>
          <p className="mt-1 text-sm text-(--color-secondary)">{form.city || 'City'}</p>
          <p className="mt-2 text-2xl font-bold text-(--color-primary)">${form.price_per_night || 0}</p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white">
          <img src={globeImage} alt="Preview card" className="h-36 w-full object-cover opacity-90" />
          <div className="p-3">
            <p className="text-xs text-slate-300">Live Preview</p>
            <p className="text-2xl font-bold">{form.title || 'New Listing'}</p>
          </div>
        </section>
      </aside>
    </form>
  )
}

export default PropertyOverviewForm
