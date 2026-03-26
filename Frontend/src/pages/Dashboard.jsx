import { Link } from 'react-router-dom'
import p1 from '../assets/p1.avif'
import p2 from '../assets/p2.avif'
import p3 from '../assets/p3.avif'
import p4 from '../assets/p4.avif'

const metricCards = [
  { title: 'Total Properties', value: '1,248', note: '+12%', tone: 'text-emerald-600' },
  { title: 'Active Tenants', value: '3,892', note: '+3.4%', tone: 'text-blue-600' },
  { title: 'Monthly Revenue', value: '$452.9k', note: 'On Track', tone: 'text-emerald-600' },
  { title: 'Maintenance', value: '142', note: '24 Open', tone: 'text-rose-600' },
]

const rows = [
  {
    image: p1,
    name: 'The Glass Pavilion',
    address: '882 Skyline Dr, Beverly Hills',
    role: 'Luxury Residential',
    manager: 'Managed by Sarah L.',
    status: 'Active',
    statusTone: 'bg-emerald-100 text-emerald-700',
    date: 'Oct 12, 2023',
  },
  {
    image: p2,
    name: 'Meridian Heights',
    address: '42 Pearl St, Manhattan',
    role: 'Multi-Family',
    manager: 'Managed by James R.',
    status: 'Pending Lease',
    statusTone: 'bg-blue-100 text-blue-700',
    date: 'Nov 04, 2023',
  },
  {
    image: p3,
    name: 'Nexus Corporate Center',
    address: '200 Innovation Wy, Palo Alto',
    role: 'Commercial Office',
    manager: 'Managed by Enterprise Team',
    status: 'Under Maintenance',
    statusTone: 'bg-amber-100 text-amber-700',
    date: 'Dec 18, 2023',
  },
  {
    image: p4,
    name: 'Zenith Retreat',
    address: '11 Canyon Dr, Aspen',
    role: 'Luxury Residential',
    manager: 'Managed by Maria L.',
    status: 'Active',
    statusTone: 'bg-emerald-100 text-emerald-700',
    date: 'Jan 02, 2024',
  },
]

function SidebarLink({ label, active = false }) {
  return (
    <button
      type="button"
      className={
        active
          ? 'flex h-9 w-full items-center gap-2 rounded-xl bg-white px-3 text-xs font-semibold text-[var(--color-primary)]'
          : 'flex h-9 w-full items-center gap-2 rounded-xl px-3 text-xs font-medium text-[var(--color-secondary)] hover:bg-white/70'
      }
    >
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center text-current">
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 5V19M15 5V19M5 12H19" />
        </svg>
      </span>
      {label}
    </button>
  )
}

function AdminSidebar() {
  return (
    <aside className="hidden border-r border-slate-200 bg-[#e9edf2] px-3 py-4 md:block">
      <div className="mb-6 flex items-center gap-2 px-1">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 5H20V19H4V5Z" />
            <path d="M4 9H20" />
          </svg>
        </span>
        <div>
          <p className="text-xs font-bold text-[var(--color-primary)]">Management</p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">Premium Suite</p>
        </div>
      </div>

      <nav className="space-y-1">
        <SidebarLink label="Overview" />
        <SidebarLink label="Properties" active />
        <SidebarLink label="Bookings" />
        <SidebarLink label="Financials" />
        <SidebarLink label="Messages" />
      </nav>

      <Link to="/add-property" className="mt-60 block rounded-xl bg-[var(--color-primary)] px-4 py-2 text-center text-xs font-semibold text-white">
        + Add Property
      </Link>

      <div className="mt-4 space-y-1 text-xs">
        <button type="button" className="flex h-8 w-full items-center gap-2 rounded-xl px-3 text-[var(--color-secondary)] hover:bg-white/70">Settings</button>
        <button type="button" className="flex h-8 w-full items-center gap-2 rounded-xl px-3 text-[var(--color-secondary)] hover:bg-white/70">Support</button>
      </div>
    </aside>
  )
}

function AdminTopbar() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-5">
      <p className="text-sm font-bold text-[var(--color-ink)]">Properties</p>

      <nav className="hidden items-center gap-4 text-[10px] font-semibold md:flex">
        <a href="#" className="border-b border-[var(--color-primary)] pb-0.5 text-[var(--color-primary)]">All Assets</a>
        <a href="#" className="text-[var(--color-secondary)]">Maintenance</a>
        <a href="#" className="text-[var(--color-secondary)]">Users</a>
      </nav>

      <div className="flex items-center gap-3">
        <label className="hidden items-center gap-2 rounded-full bg-[#edf1f5] px-3 py-1 text-[10px] text-[var(--color-secondary)] lg:flex">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L16.65 16.65" />
          </svg>
          <input type="text" placeholder="Global search..." className="w-28 bg-transparent outline-none" />
        </label>
        <button type="button" className="text-slate-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" />
            <path d="M18 16V11C18 7.7 16.4 4.9 13.5 4.2V3.5C13.5 2.7 12.8 2 12 2C11.2 2 10.5 2.7 10.5 3.5V4.2C7.6 4.9 6 7.7 6 11V16L4 18V19H20V18L18 16Z" />
          </svg>
        </button>
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] font-bold text-white">A</span>
      </div>
    </header>
  )
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <div className="grid min-h-screen w-full border-x border-slate-200 bg-[#edf1f6] md:grid-cols-[170px_1fr]">
        <AdminSidebar />

        <div className="flex min-h-screen flex-col">
          <AdminTopbar />

          <main className="flex-1 px-4 py-3 md:px-5">
            <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-3.5">
                  <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold">
                    <p className="uppercase tracking-[0.12em] text-[var(--color-secondary)]">{item.title}</p>
                    <span className={item.tone}>{item.note}</span>
                  </div>
                  <p className="text-[30px] font-bold leading-tight text-[var(--color-ink)]">{item.value}</p>
                </article>
              ))}
            </section>

            <section className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-[var(--color-ink)]">Manage Assets</h2>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">342 entries</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                  <button className="rounded-full bg-[#edf1f5] px-3 py-1 text-[var(--color-secondary)]">Status: All</button>
                  <button className="rounded-full bg-[#edf1f5] px-3 py-1 text-[var(--color-secondary)]">Added: Any time</button>
                  <button className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-white">Export</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#f4f7fb] text-left text-[9px] uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Name & Address</th>
                      <th className="px-4 py-2.5 font-semibold">Role / Type</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                      <th className="px-4 py-2.5 font-semibold">Date Added</th>
                      <th className="px-4 py-2.5 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.name} className="border-t border-slate-100">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <img src={row.image} alt={row.name} className="h-9 w-9 rounded-full object-cover" />
                            <div>
                              <p className="text-xs font-semibold text-[var(--color-ink)]">{row.name}</p>
                              <p className="text-[10px] text-[var(--color-secondary)]">{row.address}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <p className="text-xs font-semibold text-[var(--color-ink)]">{row.role}</p>
                          <p className="text-[10px] text-[var(--color-secondary)]">{row.manager}</p>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${row.statusTone}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-[10px] text-[var(--color-secondary)]">{row.date}</td>
                        <td className="px-4 py-2.5 text-[10px] text-[var(--color-secondary)]">✎ ⋮</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2 text-[10px] text-[var(--color-secondary)]">
                <p>Showing 1-10 of 342 properties</p>
                <div className="flex items-center gap-2">
                  <button type="button">‹</button>
                  <button type="button" className="rounded bg-[#edf1f5] px-1.5 py-0.5 text-[var(--color-primary)]">1</button>
                  <button type="button">2</button>
                  <button type="button">3</button>
                  <button type="button">›</button>
                </div>
              </div>
            </section>

            <section className="mt-3 grid gap-3 xl:grid-cols-[2fr_1fr]">
              <article className="rounded-2xl bg-[linear-gradient(120deg,#0f1e3d_0%,#102b57_60%,#173d73_100%)] p-4 text-white">
                <p className="mb-2 inline-block rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">System Analytics</p>
                <h3 className="text-4xl font-bold leading-tight">Occupancy Optimization Protocol</h3>
                <p className="mt-2 max-w-lg text-xs text-blue-100">
                  Our predictive concierge engine suggests increasing lease rates at Meridian Heights by 4.2% based on local market velocity and current demand spikes in the Manhattan sector.
                </p>
                <button type="button" className="mt-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#102b57]">View AI insights</button>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-[#e8eef5] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[var(--color-ink)]">Recent Activity</h3>
                  <button className="text-[10px] font-semibold text-[var(--color-primary)]">Clear</button>
                </div>
                <ul className="space-y-3 text-[11px] text-[var(--color-secondary)]">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <div>
                      <p className="font-semibold text-[var(--color-ink)]">New maintenance request filed</p>
                      <p className="text-[10px]">Glass Pavilion · Unit 302 · 5m ago</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <div>
                      <p className="font-semibold text-[var(--color-ink)]">Lease agreement signed</p>
                      <p className="text-[10px]">Meridian Heights · Unit 18A · 1h ago</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <div>
                      <p className="font-semibold text-[var(--color-ink)]">Scheduled HVAC inspection</p>
                      <p className="text-[10px]">Nexus Center · Ground Floor · 5h ago</p>
                    </div>
                  </li>
                </ul>
              </article>
            </section>
          </main>

          <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-3 text-[10px] text-[var(--color-secondary)]">
            <p>© 2024 EstateConcierge. All rights reserved.</p>
            <nav className="hidden items-center gap-5 md:flex">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
              <a href="#">Contact</a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
