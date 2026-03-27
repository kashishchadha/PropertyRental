import { useEffect, useState } from 'react'
import { bookingApi } from '../../booking/services/bookingApi'

const statusTone = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-rose-100 text-rose-700',
  completed: 'bg-blue-100 text-blue-700'
}

function DashboardBookingsTable() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true)
        setError('')
        const bookings = await bookingApi.listMine()
        setRows(bookings.slice(0, 8))
      } catch (err) {
        setError(err.message || 'Failed to load bookings')
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [])

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-(--color-ink)">Recent Bookings</h2>
        <span className="text-sm font-semibold text-(--color-primary)">Live Data</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {isLoading ? <p className="px-4 py-3 text-sm text-slate-500">Loading bookings...</p> : null}
        {error ? <p className="px-4 py-3 text-sm text-rose-700">{error}</p> : null}
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
              <tr key={row.id} className="border-t border-slate-100">
                <td className="px-4 py-4 text-base font-semibold text-(--color-ink)">{row.property_title}</td>
                <td className="px-4 py-4 text-sm text-(--color-secondary)">Tenant #{row.tenant_id}</td>
                <td className="px-4 py-4 text-sm text-(--color-secondary)">{new Date(row.start_date).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-base font-semibold text-(--color-ink)">${Number(row.total_amount).toLocaleString()}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${statusTone[row.status] || 'bg-slate-100 text-slate-700'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
            {!isLoading && !error && rows.length === 0 ? (
              <tr className="border-t border-slate-100">
                <td colSpan={5} className="px-4 py-4 text-sm text-slate-500">No bookings found yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DashboardBookingsTable
