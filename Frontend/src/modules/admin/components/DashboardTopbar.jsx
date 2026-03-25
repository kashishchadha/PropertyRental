import { Link } from 'react-router-dom'

function DashboardTopbar() {
  return (
    <header className="flex h-[62px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <Link to="/" className="text-2xl font-bold leading-none text-[var(--color-ink)] hover:text-[var(--color-primary)]">
        EstateConcierge
      </Link>

      <div className="mx-6 hidden flex-1 lg:block">
        <label className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-full border border-slate-200 bg-[#edf1f5] px-4 py-2.5 text-sm text-[var(--color-secondary)]">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L16.65 16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-secondary)]"
          />
        </label>
      </div>

      <div className="flex items-center gap-5 text-[14px] font-semibold">
        <nav className="hidden items-center gap-5 md:flex">
          <a href="#" className="border-b-2 border-[var(--color-primary)] pb-1 text-[var(--color-primary)]">Dashboard</a>
          <a href="#" className="text-[var(--color-secondary)] hover:text-[var(--color-ink)]">Properties</a>
          <a href="#" className="text-[var(--color-secondary)] hover:text-[var(--color-ink)]">Management</a>
        </nav>
        <button type="button" className="text-[var(--color-secondary)]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" />
            <path d="M18 16V11C18 7.7 16.4 4.9 13.5 4.2V3.5C13.5 2.7 12.8 2 12 2C11.2 2 10.5 2.7 10.5 3.5V4.2C7.6 4.9 6 7.7 6 11V16L4 18V19H20V18L18 16Z" />
          </svg>
        </button>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  )
}

export default DashboardTopbar
