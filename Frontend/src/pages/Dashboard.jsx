import DashboardSidebar from '../modules/admin/components/DashboardSidebar'
import DashboardTopbar from '../modules/admin/components/DashboardTopbar'
import DashboardStats from '../modules/admin/components/DashboardStats'
import DashboardBookingsTable from '../modules/admin/components/DashboardBookingsTable'
import DashboardPortfolioPanel from '../modules/admin/components/DashboardPortfolioPanel'

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <div className="grid min-h-screen w-full overflow-hidden border border-slate-200/70 bg-[#edf1f6] md:grid-cols-[280px_1fr]">
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        <div className="flex min-h-screen flex-col">
          <DashboardTopbar />

          <main className="flex-1 px-5 py-5 md:px-8 md:py-7">
            <section>
              <h1 className="text-3xl font-bold leading-tight text-[var(--color-ink)]">Welcome back, Alexandra</h1>
              <p className="mt-1.5 max-w-3xl text-base leading-7 text-[var(--color-secondary)]">
                Here is what&apos;s happening across your estate portfolio today. You have 3 pending requests that need attention.
              </p>
            </section>

            <section className="mt-5">
              <DashboardStats />
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_380px]">
              <DashboardBookingsTable />
              <DashboardPortfolioPanel />
            </section>
          </main>

          <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-[13px] text-[var(--color-secondary)] md:px-8">
            <p>© 2024 EstateConcierge. All rights reserved.</p>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#" className="hover:text-[var(--color-primary)]">Terms</a>
              <a href="#" className="hover:text-[var(--color-primary)]">Privacy</a>
              <a href="#" className="hover:text-[var(--color-primary)]">Cookies</a>
              <a href="#" className="hover:text-[var(--color-primary)]">Contact</a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
