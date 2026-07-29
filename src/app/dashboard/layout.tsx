import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
