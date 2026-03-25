function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[var(--color-primary)]" stroke="currentColor" strokeWidth="2">
      <path d="M12 21C16.2 16.8 18.5 13.7 18.5 10.5C18.5 6.9 15.6 4 12 4C8.4 4 5.5 6.9 5.5 10.5C5.5 13.7 7.8 16.8 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  )
}

function CashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[var(--color-primary)]" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 9H7.1M17 15H17.1" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[var(--color-primary)]" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5L12 4L21 10.5" />
      <path d="M6.5 9.7V20H17.5V9.7" />
      <path d="M10 20V14H14V20" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16.65 16.65" />
    </svg>
  )
}

function FilterItem({ icon, label, value }) {
  return (
    <div className="min-w-[140px] px-3 py-1">
      <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm font-semibold text-[var(--color-secondary)]">{value}</div>
    </div>
  )
}

function HeroSearchBar() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-3 rounded-[26px] border border-white/60 bg-white/95 p-3 shadow-2xl md:flex-row md:items-center md:gap-0 md:p-2">
      <FilterItem icon={<PinIcon />} label="Location" value="Where to?" />
      <div className="hidden h-10 w-px bg-slate-200 md:block" />
      <FilterItem icon={<CashIcon />} label="Budget" value="Price Range" />
      <div className="hidden h-10 w-px bg-slate-200 md:block" />
      <FilterItem icon={<HomeIcon />} label="Type" value="Villa" />
      <button className="btn-primary-theme mt-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-md md:ml-auto md:mt-0">
        <SearchIcon />
        Search
      </button>
    </div>
  )
}

export default HeroSearchBar
