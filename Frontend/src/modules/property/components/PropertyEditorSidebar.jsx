function StepIcon({ type }) {
  if (type === 'overview') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="7" height="7" rx="1.2" />
        <rect x="13" y="4" width="7" height="7" rx="1.2" />
        <rect x="4" y="13" width="7" height="7" rx="1.2" />
        <rect x="13" y="13" width="7" height="7" rx="1.2" />
      </svg>
    )
  }

  if (type === 'location') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21C16.2 16.8 18.5 13.7 18.5 10.5C18.5 6.9 15.6 4 12 4C8.4 4 5.5 6.9 5.5 10.5C5.5 13.7 7.8 16.8 12 21Z" />
        <circle cx="12" cy="10.5" r="2.3" />
      </svg>
    )
  }

  if (type === 'pricing') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M7 9H7.1M17 15H17.1" />
      </svg>
    )
  }

  if (type === 'media') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.4" />
        <path d="M20 15L15 11L9 17" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 12L10.2 15.2L17 8.5" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  )
}

const steps = [
  { id: 'overview', label: 'Overview', active: true },
  { id: 'location', label: 'Location' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'media', label: 'Media' },
  { id: 'review', label: 'Review' },
]

function PropertyEditorSidebar() {
  return (
    <aside className="hidden h-full border-r border-slate-200 bg-[#e9edf2] px-4 py-6 md:block">
      <div className="mb-8 px-2">
        <p className="text-2xl font-bold text-[var(--color-ink)]">The Estate</p>
        <p className="text-sm text-[var(--color-secondary)]">Digital Concierge</p>
      </div>

      <nav className="space-y-2">
        {steps.map((step) => (
          <button
            key={step.id}
            className={
              step.active
                ? 'flex h-11 w-full items-center gap-3 rounded-xl bg-white px-3 text-sm font-semibold text-[var(--color-primary)]'
                : 'flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[var(--color-secondary)] hover:bg-white/70'
            }
            type="button"
          >
            <span className={step.active ? 'inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white' : 'inline-flex h-7 w-7 items-center justify-center text-[var(--color-secondary)]'}>
              <StepIcon type={step.id} />
            </span>
            {step.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default PropertyEditorSidebar
