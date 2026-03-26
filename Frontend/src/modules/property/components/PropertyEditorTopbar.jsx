import { Link } from 'react-router-dom'

function PropertyEditorTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex min-w-0 items-center gap-8">
        <Link to="/" className="shrink-0 whitespace-nowrap text-xl font-bold text-(--color-ink) hover:text-(--color-primary)">
          The Estate
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
          <Link to="/dashboard" className="text-(--color-secondary) hover:text-(--color-ink)">Dashboard</Link>
          <a href="#" className="border-b-2 border-(--color-primary) pb-1 text-(--color-primary)">Properties</a>
          <a href="#" className="text-(--color-secondary) hover:text-(--color-ink)">Leases</a>
          <a href="#" className="text-(--color-secondary) hover:text-(--color-ink)">Analytics</a>
        </nav>
      </div>

      <div className="mx-4 hidden flex-1 xl:block">
        <label className="mx-auto flex w-full max-w-xs items-center gap-2 rounded-full border border-slate-200 bg-[#edf1f5] px-4 py-2 text-sm text-(--color-secondary)">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L16.65 16.65" />
          </svg>
          <input type="text" placeholder="Search properties..." className="w-full bg-transparent text-sm outline-none" />
        </label>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button type="button" className="btn-primary-theme rounded-full px-4 py-2 text-sm font-semibold">Add Property</button>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary) text-sm font-bold text-white">A</div>
      </div>
    </header>
  )
}

export default PropertyEditorTopbar
