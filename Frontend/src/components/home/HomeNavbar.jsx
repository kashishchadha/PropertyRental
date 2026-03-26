import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Properties', to: '/properties' },
  { label: 'Management', to: '/dashboard' },
  { label: 'Company', to: '#' },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16.65 16.65" />
    </svg>
  )
}

function HomeNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="text-lg font-bold text-[var(--color-ink)]">EstateConcierge</div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--color-secondary)] md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className={
                index === 0
                  ? 'border-b-2 border-[var(--color-primary)] pb-1 text-[var(--color-primary)]'
                  : 'transition hover:text-[var(--color-ink)]'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          <button className="hidden rounded-full p-2 text-[var(--color-secondary)] transition hover:bg-slate-100 hover:text-[var(--color-ink)] md:inline-flex">
            <SearchIcon />
          </button>
          <Link to="/login" className="text-[var(--color-ink)] transition hover:text-[var(--color-primary)]">
            Login
          </Link>
          <Link to="/signup" className="btn-primary-theme rounded-full px-4 py-2 shadow-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HomeNavbar
