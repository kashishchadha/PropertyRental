const rows = [
  {
    property: 'Azure Heights',
    tenant: 'Marcus Thorne',
    date: 'Oct 24, 2024',
    amount: '$4,500',
    status: 'Active',
    tone: 'bg-emerald-100 text-emerald-700',
  },
  {
    property: 'The Foundry Loft',
    tenant: 'Sarah Jenkins',
    date: 'Oct 26, 2024',
    amount: '$2,800',
    status: 'Pending',
    tone: 'bg-amber-100 text-amber-700',
  },
  {
    property: 'Skyline Terrace',
    tenant: 'Elena Rodriguez',
    date: 'Oct 28, 2024',
    amount: '$3,150',
    status: 'Canceled',
    tone: 'bg-rose-100 text-rose-700',
  },
]

function DashboardBookingsTable() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-(--color-ink)">Recent Bookings</h2>
        <button type="button" className="text-sm font-semibold text-(--color-primary)">View All</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-[#f1f4f8] text-left text-xs uppercase tracking-[0.12em] text-(--color-secondary)">
            <tr>
              <th className="px-4 py-3 font-semibold">Property</th>
              <th className="px-4 py-3 font-semibold">Tenant</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.property} className="border-t border-slate-100">
                <td className="px-4 py-4 text-base font-semibold text-(--color-ink)">{row.property}</td>
                <td className="px-4 py-4 text-sm text-(--color-secondary)">{row.tenant}</td>
                <td className="px-4 py-4 text-sm text-(--color-secondary)">{row.date}</td>
                <td className="px-4 py-4 text-base font-semibold text-(--color-ink)">{row.amount}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${row.tone}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DashboardBookingsTable
