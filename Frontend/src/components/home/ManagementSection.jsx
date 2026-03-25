function FeatureItem({ title }) {
  return (
    <li className="flex items-center gap-3 text-sm font-medium text-[var(--color-secondary)]">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
        <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
      </span>
      {title}
    </li>
  )
}

function DashboardPreview() {
  return (
    <div className="relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--color-secondary)]">Portfolio Overview</p>
        <span className="text-[var(--color-secondary)]">...</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-[var(--color-secondary)]">Occupancy Rate</p>
          <p className="text-3xl font-bold text-[var(--color-primary)]">98.4%</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-[var(--color-secondary)]">Monthly Revenue</p>
          <p className="text-3xl font-bold text-[var(--color-ink)]">$142k</p>
        </div>
      </div>

      <div className="mt-5 flex h-36 items-end gap-2 rounded-2xl bg-slate-50 p-4">
        <span className="h-8 w-1/6 rounded bg-[#c6d5f2]" />
        <span className="h-12 w-1/6 rounded bg-[#9bb8ea]" />
        <span className="h-9 w-1/6 rounded bg-[#7da1e1]" />
        <span className="h-20 w-1/6 rounded bg-[var(--color-primary)]" />
        <span className="h-14 w-1/6 rounded bg-[#6f96dc]" />
        <span className="h-7 w-1/6 rounded bg-[#9bb8ea]" />
      </div>

      <div className="absolute -bottom-3 right-5 rounded-full bg-white px-4 py-2 shadow-md ring-1 ring-slate-200">
        <p className="text-xs font-semibold text-emerald-600">Lease Signed</p>
      </div>
    </div>
  )
}

function ManagementSection() {
  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="inline-block rounded-full bg-[rgba(122,115,144,0.18)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-tertiary)]">
            Management Suite
          </p>
          <h2 className="mt-4 text-5xl font-bold leading-tight text-[var(--color-ink)] md:text-6xl">
            Effortless Control for Property Owners
          </h2>
          <p className="mt-4 text-lg text-[var(--color-secondary)]">
            Our proprietary management dashboard gives you a bird&apos;s-eye view of your entire portfolio.
            Automate leasing, handle maintenance, and track financials in one high-fidelity interface.
          </p>

          <ul className="mt-8 space-y-4">
            <FeatureItem title="Real-time Performance Analytics" />
            <FeatureItem title="Verified Tenant Screening" />
            <FeatureItem title="Automated Financial Reporting" />
          </ul>

          <button className="mt-8 rounded-2xl bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-700">
            Discover Management Tools
          </button>
        </div>

        <div className="self-center">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}

export default ManagementSection
