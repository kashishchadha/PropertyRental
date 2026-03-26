import { Link } from 'react-router-dom'

function SidebarIcon({ children, active = false }) {
  return (
    <span
      className={
        active
          ? 'inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white'
          : 'inline-flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-secondary)]'
      }
    >
      {children}
    </span>
  )
}

function MenuSymbol({ id }) {
  if (id === 'overview') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="7" height="7" rx="1.2" />
        <rect x="13" y="4" width="7" height="7" rx="1.2" />
        <rect x="4" y="13" width="7" height="7" rx="1.2" />
        <rect x="13" y="13" width="7" height="7" rx="1.2" />
      </svg>
    )
  }

  if (id === 'properties') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5L12 4L21 10.5" />
        <path d="M6.5 9.7V20H17.5V9.7" />
        <path d="M10 20V14H14V20" />
      </svg>
    )
  }

  if (id === 'bookings') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 4V8M16 4V8M4 11H20" />
      </svg>
    )
  }

  if (id === 'financials') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M7 9H7.1M17 15H17.1" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5H20V15H8L4 19V5Z" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z" />
      <path d="M19 12L21 12M3 12L5 12M12 3L12 5M12 19L12 21M17 7L18.5 5.5M5.5 18.5L7 17M17 17L18.5 18.5M5.5 5.5L7 7" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.7 9.5A2.6 2.6 0 0 1 14.3 11.1C14.3 12.8 12 13.1 12 14.7" />
      <circle cx="12" cy="17.3" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

const menuItems = [
  { id: 'overview', label: 'Overview', active: true },
  { id: 'properties', label: 'Properties', to: '/properties' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'financials', label: 'Financials' },
  { id: 'messages', label: 'Messages' },
]

function DashboardSidebar() {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-[#e9edf2] pl-2 pr-4 py-5">
      <div className="mb-8 flex items-center gap-3 px-1">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 5H20V19H4V5Z" />
            <path d="M4 9H20" />
            <path d="M8 5V19" />
            <path d="M16 5V19" />
          </svg>
        </div>
        <div>
          <p className="text-2xl font-bold leading-none text-[var(--color-primary)]">Management</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">Premium Suite</p>
        </div>
      </div>

      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const itemClass = item.active
            ? 'grid h-14 w-full grid-cols-[40px_1fr] items-center gap-3 rounded-2xl bg-white px-3 text-left text-sm font-semibold text-[var(--color-primary)]'
            : 'grid h-14 w-full grid-cols-[40px_1fr] items-center gap-3 rounded-2xl px-3 text-left text-sm font-medium text-[var(--color-secondary)] hover:bg-white/70'

          if (item.to) {
            return (
              <Link key={item.id} to={item.to} className={itemClass}>
                <SidebarIcon active={item.active}>
                  <MenuSymbol id={item.id} />
                </SidebarIcon>
                {item.label}
              </Link>
            )
          }

          return (
            <button key={item.id} className={itemClass} type="button">
              <SidebarIcon active={item.active}>
                <MenuSymbol id={item.id} />
              </SidebarIcon>
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto">
        <Link to="/add-property" className="btn-primary-theme mb-5 block w-full rounded-xl px-4 py-2.5 text-center text-sm font-semibold shadow-[0_8px_16px_rgba(0,82,204,0.22)]">
          + Add Property
        </Link>
        <div className="space-y-1.5">
          <button type="button" className="grid h-11 w-full grid-cols-[32px_1fr] items-center gap-2 rounded-xl px-3 text-left text-sm text-[var(--color-secondary)] hover:bg-white/70">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-secondary)]">
              <SettingsIcon />
            </span>
            Settings
          </button>
          <button type="button" className="grid h-11 w-full grid-cols-[32px_1fr] items-center gap-2 rounded-xl px-3 text-left text-sm text-[var(--color-secondary)] hover:bg-white/70">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-secondary)]">
              <SupportIcon />
            </span>
            Support
          </button>
        </div>
      </div>
    </aside>
  )
}

export default DashboardSidebar
