import { useEffect, useMemo, useState } from 'react'
import DashboardBookingsTable from '../modules/admin/components/DashboardBookingsTable'
import DashboardPortfolioPanel from '../modules/admin/components/DashboardPortfolioPanel'
import DashboardSidebar from '../modules/admin/components/DashboardSidebar'
import DashboardStats from '../modules/admin/components/DashboardStats'
import DashboardTopbar from '../modules/admin/components/DashboardTopbar'
import { useAuthStore } from '../modules/auth/store/useAuthStore'
import { bookingApi } from '../modules/booking/services/bookingApi'
import { maintenanceApi } from '../modules/maintenance/services/maintenanceApi'
import { paymentApi } from '../modules/payment/services/paymentApi'
import { propertyApi } from '../modules/property/services/propertyApi'

function Dashboard() {
  const user = useAuthStore((state) => state.user)

  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [properties, setProperties] = useState([])
  const [bookings, setBookings] = useState([])
  const [maintenanceRequests, setMaintenanceRequests] = useState([])
  const [payments, setPayments] = useState([])

  useEffect(() => {
    const loadOverview = async () => {
      try {
        setIsLoading(true)
        setLoadError('')

        const [propertiesData, bookingsData, maintenanceData] = await Promise.all([
          propertyApi.list(),
          bookingApi.listMine(),
          maintenanceApi.list().catch(() => [])
        ])

        setProperties(propertiesData)
        setBookings(bookingsData)
        setMaintenanceRequests(maintenanceData)

        const uniqueBookingIds = [...new Set(bookingsData.map((booking) => booking.id))]
        const paymentRows = await Promise.all(
          uniqueBookingIds.map(async (bookingId) => {
            try {
              return await paymentApi.listByBooking(bookingId)
            } catch {
              return []
            }
          })
        )

        setPayments(paymentRows.flat())
      } catch (error) {
        setLoadError(error.message || 'Failed to load dashboard overview')
      } finally {
        setIsLoading(false)
      }
    }

    loadOverview()
  }, [])

  const overviewStats = useMemo(() => {
    const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed').length
    const paidPayments = payments.filter((payment) => payment.status === 'paid')
    const totalRevenue = paidPayments.reduce((total, payment) => total + Number(payment.amount || 0), 0)
    const pendingRequests = maintenanceRequests.filter((request) => request.status === 'open' || request.status === 'in_progress').length

    return {
      totalBookings: bookings.length,
      confirmedBookings,
      paidPayments: paidPayments.length,
      totalRevenue,
      pendingRequests
    }
  }, [bookings, maintenanceRequests, payments])

  const featuredProperty = properties[0] || null
  const portfolioTarget = 1000000

  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <DashboardSidebar />

          <div className="flex min-h-full flex-col">
            <DashboardTopbar />

            <main className="flex-1 px-5 py-6 lg:px-8">
              <section>
                <h1 className="text-5xl font-bold leading-tight text-(--color-ink)">Welcome back, {user?.name || 'Manager'}</h1>
                <p className="mt-2 max-w-3xl text-lg text-(--color-secondary)">
                  Here is what&apos;s happening across your estate portfolio today. You have {overviewStats.pendingRequests} pending requests that need attention.
                </p>
                {isLoading ? <p className="mt-2 text-sm text-slate-500">Syncing overview data...</p> : null}
                {loadError ? <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{loadError}</p> : null}
              </section>

              <section className="mt-6">
                <DashboardStats stats={overviewStats} />
              </section>

              <section className="mt-7 grid gap-6 xl:grid-cols-[2fr_1fr]">
                <DashboardBookingsTable />
                <DashboardPortfolioPanel featuredProperty={featuredProperty} totalRevenue={overviewStats.totalRevenue} portfolioTarget={portfolioTarget} />
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
