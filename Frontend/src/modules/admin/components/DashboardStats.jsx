const cards = [
  {
    title: 'Total Bookings',
    value: '1,284',
    change: '~12%',
    changeColor: 'text-emerald-600',
    accent: 'bg-[var(--color-primary)]',
  },
  {
    title: 'Monthly Revenue',
    value: '$42,850',
    change: '~8.4%',
    changeColor: 'text-emerald-600',
    accent: 'bg-[var(--color-tertiary)]',
  },
  {
    title: 'Pending Requests',
    value: '14',
    change: '! High Priority',
    changeColor: 'text-rose-600',
    accent: 'bg-[#b34545]',
  },
]

function Sparkline({ accent }) {
  return (
    <div className="mt-5 flex items-end gap-4">
      <span className="h-2 w-1 rounded bg-slate-300" />
      <span className="h-3 w-1 rounded bg-slate-300" />
      <span className="h-4 w-1 rounded bg-slate-300" />
      <span className="h-5 w-1 rounded bg-slate-400" />
      <span className="h-4 w-1 rounded bg-slate-400" />
      <span className={`h-6 w-1 rounded ${accent}`} />
    </div>
  )
}

function DashboardStats() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-[var(--color-secondary)]">{card.title}</p>
          <p className="mt-1 text-[36px] font-bold leading-tight text-[var(--color-ink)]">{card.value}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className={`text-xs font-semibold ${card.changeColor}`}>{card.change}</p>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white ${card.accent}`}>
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </div>
          <Sparkline accent={card.accent} />
        </article>
      ))}
    </div>
  )
}

export default DashboardStats
