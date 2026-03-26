import globeImage from '../../../assets/globe.png'

function NumberControl({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">{label}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-4xl font-bold text-(--color-ink)">{value}</p>
        <div className="space-y-1">
          <button type="button" className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-(--color-primary)">+</button>
          <button type="button" className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-(--color-primary)">-</button>
        </div>
      </div>
    </div>
  )
}

function PropertyOverviewForm() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
      <div className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div>
            <label className="text-sm font-semibold text-(--color-ink)">Property Title</label>
            <input
              type="text"
              placeholder="e.g., Azure Horizon Penthouse"
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#edf1f5] px-4 text-base outline-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-(--color-ink)">Description</label>
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
              <div className="flex h-10 items-center gap-4 bg-[#edf1f5] px-4 text-sm font-semibold text-(--color-secondary)">
                <span>B</span>
                <span className="italic">I</span>
                <span>≡</span>
                <span>🔗</span>
              </div>
              <textarea
                rows={5}
                placeholder="Describe the architectural highlights, amenities, and unique neighborhood features..."
                className="w-full resize-none bg-[#edf1f5] p-4 text-base text-(--color-secondary) outline-none"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <NumberControl label="Bedrooms" value="03" />
          <NumberControl label="Bathrooms" value="2.5" />
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">Area (sqft)</p>
            <p className="mt-2 text-4xl font-bold text-(--color-ink)">2450</p>
          </div>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-(--color-ink)">
            <span className="text-(--color-primary)">◈</span>
            Classification
          </h3>

          <div className="mt-4">
            <label className="text-sm font-semibold text-(--color-ink)">Property Type</label>
            <button type="button" className="mt-2 flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-[#f5f7fa] px-4 text-sm font-semibold text-(--color-secondary)">
              Modern Penthouse
              <span>⌄</span>
            </button>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-(--color-ink)">Listing Type</label>
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-full bg-[#edf1f5] p-1">
              <button type="button" className="rounded-full bg-[rgba(0,82,204,0.16)] px-3 py-1.5 text-sm font-semibold text-(--color-primary)">Rental</button>
              <button type="button" className="rounded-full px-3 py-1.5 text-sm font-semibold text-(--color-secondary)">Sale</button>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-secondary)">Expert Tip</p>
            <p className="mt-2 text-sm leading-6 text-(--color-secondary)">
              Properties with descriptions longer than 500 characters see 30% more engagement from premium tenants.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white">
          <img src={globeImage} alt="Preview card" className="h-36 w-full object-cover opacity-90" />
          <div className="p-3">
            <p className="text-xs text-slate-300">Preview Card</p>
            <p className="text-2xl font-bold">Azure Horizon...</p>
          </div>
        </section>
      </aside>
    </div>
  )
}

export default PropertyOverviewForm
