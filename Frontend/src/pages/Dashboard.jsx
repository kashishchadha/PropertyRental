import DashboardBookingsTable from '../modules/admin/components/DashboardBookingsTable'
import DashboardPortfolioPanel from '../modules/admin/components/DashboardPortfolioPanel'
import DashboardSidebar from '../modules/admin/components/DashboardSidebar'
import DashboardStats from '../modules/admin/components/DashboardStats'
import DashboardTopbar from '../modules/admin/components/DashboardTopbar'

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <DashboardSidebar />

          <div className="flex min-h-full flex-col">
            <DashboardTopbar />

            <main className="flex-1 px-5 py-6 lg:px-8">
              <section>
                <h1 className="text-5xl font-bold leading-tight text-(--color-ink)">Welcome back, Alexandra</h1>
                <p className="mt-2 max-w-3xl text-lg text-(--color-secondary)">
                  Here is what&apos;s happening across your estate portfolio today. You have 3 pending requests that need attention.
                </p>
              </section>

              <section className="mt-6">
                <DashboardStats />
              </section>

              <section className="mt-7 grid gap-6 xl:grid-cols-[2fr_1fr]">
                <DashboardBookingsTable />
                <DashboardPortfolioPanel />
              </section>
            </main>

            <footer className="flex items-center justify-between border-t border-slate-200 px-8 py-4 text-xs text-(--color-secondary)">
              <p>© 2024 EstateConcierge. All rights reserved.</p>
              <nav className="hidden items-center gap-6 md:flex">
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
