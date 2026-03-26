import propertyImage from '../../../assets/blackproperty.png'

function DashboardPortfolioPanel() {
  return (
    <aside className="space-y-4">
      <h2 className="text-2xl font-bold text-(--color-ink)">Active Portfolio</h2>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-sm">
        <img src={propertyImage} alt="Portfolio property" className="h-64 w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="mb-2 inline-block rounded-full bg-(--color-primary) px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]">
            Featured Estate
          </p>
          <p className="text-3xl font-bold leading-tight">The Marble Pavilion</p>
          <p className="text-sm text-slate-200">Beverly Hills, CA</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-[#dde5ee] p-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,82,204,0.12)] text-(--color-primary)">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              <path d="M4 16L9 11L13 15L20 8" />
              <path d="M20 8H15" />
            </svg>
          </span>
          <div>
            <p className="text-base font-semibold text-(--color-ink)">Portfolio Yield</p>
            <p className="text-xs text-(--color-secondary)">Annualized return profile</p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/85">
          <div className="h-full w-[72%] rounded-full bg-(--color-primary)" />
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="text-(--color-secondary)">Target: $1M</p>
          <p className="font-semibold text-(--color-primary)">$720k (72%)</p>
        </div>
      </div>
    </aside>
  )
}

export default DashboardPortfolioPanel
