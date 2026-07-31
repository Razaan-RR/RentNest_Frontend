'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAuth } from '@/providers/AuthProvider'
import { dashboardMenu } from '@/config/dashboardMenu'

export default function DashboardSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const menus = dashboardMenu[user.role]

  return (
    <aside className="w-64 min-h-screen border-r bg-background p-6">
      <Link href="/" className="mb-8 block">
        <h1 className="text-2xl font-bold">
          RentNest <span>🏠</span>
        </h1>
      </Link>

      <nav className="space-y-2">
        {menus.map((item) => {
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              {item.icon && <item.icon className="h-5 w-5" />}
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
