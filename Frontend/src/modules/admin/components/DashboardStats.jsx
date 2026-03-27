const buildCards = (stats = {}) => {
  const safeStats = {
    totalBookings: Number(stats.totalBookings || 0),
    confirmedBookings: Number(stats.confirmedBookings || 0),
    totalRevenue: Number(stats.totalRevenue || 0),
    paidPayments: Number(stats.paidPayments || 0),
    pendingRequests: Number(stats.pendingRequests || 0)
  }

  return [
  {
    title: 'Total Bookings',
    value: safeStats.totalBookings.toLocaleString(),
    change: `${safeStats.confirmedBookings} confirmed`,
    changeColor: 'text-emerald-600',
    accent: 'bg-[rgba(0,82,204,0.14)] text-(--color-primary)',
    barAccent: 'bg-(--color-primary)',
    icon: 'bookings'
  },
  {
    title: 'Revenue',
    value: `$${safeStats.totalRevenue.toLocaleString()}`,
    change: `${safeStats.paidPayments} paid transactions`,
    changeColor: 'text-emerald-600',
    accent: 'bg-[rgba(122,115,144,0.16)] text-(--color-tertiary)',
    barAccent: 'bg-(--color-tertiary)',
    icon: 'revenue'
  },
  {
    title: 'Pending Requests',
    value: String(safeStats.pendingRequests),
    change: safeStats.pendingRequests > 0 ? '! Requires attention' : 'All clear',
    changeColor: safeStats.pendingRequests > 0 ? 'text-rose-600' : 'text-emerald-600',
    accent: 'bg-[rgba(179,69,69,0.16)] text-[#b34545]',
    barAccent: 'bg-[#b34545]',
    icon: 'alerts'
  }
]
}

function StatIcon({ type }) {
  if (type === 'bookings') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 4V8M16 4V8M4 11H20" />
      </svg>
    )
  }

  if (type === 'revenue') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="11" rx="2" />
        <circle cx="12" cy="12.5" r="2.2" />
        <path d="M7 10H7.1M17 15H17.1" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13 2L6 13H11L10 22L18 10H13L13 2Z" />
    </svg>
  )
}

function Sparkline({ accent }) {
  return (
    <div className="mt-4 flex items-end gap-4">
      <span className="h-2 w-1.5 rounded-full bg-slate-300" />
      <span className="h-4 w-1.5 rounded-full bg-slate-300" />
      <span className="h-5 w-1.5 rounded-full bg-slate-400" />
      <span className="h-6 w-1.5 rounded-full bg-slate-400" />
      <span className="h-5 w-1.5 rounded-full bg-slate-500" />
      <span className={`h-7 w-1.5 rounded-full ${accent}`} />
    </div>
  )
}

function DashboardStats({ stats }) {
  const cards = buildCards(stats)

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[31px] leading-none font-bold text-(--color-ink)">{card.value}</p>
              <p className="mt-3 text-xs font-semibold text-(--color-secondary)">{card.title}</p>
            </div>
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${card.accent}`}>
              <StatIcon type={card.icon} />
            </span>
          </div>
          <p className={`mt-3 text-xs font-semibold ${card.changeColor}`}>{card.change}</p>
          <Sparkline accent={card.barAccent} />
        </article>
      ))}
    </div>
  )
}

export default DashboardStats
