'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getAdminStats } from '@/services/admin.service'

import {
  Users,
  Building2,
  FileText,
  Clock,
  Home,
  DollarSign,
} from 'lucide-react'

interface Stats {
  totalUsers: number
  totalProperties: number
  totalRentalRequests: number
  pendingRequests: number
  activeRentals: number
  completedRentals: number
  totalRevenue: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  const loadStats = async () => {
    try {
      const response = (await getAdminStats()) as {
        stats: Stats
      }

      setStats(response.stats)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to load dashboard stats',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchStats = async () => {
      await loadStats()
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="py-10 text-center">Loading dashboard...</div>
  }

  if (!stats) {
    return <div className="py-10 text-center">No statistics available</div>
  }

  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
    },

    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: Building2,
    },

    {
      title: 'Rental Requests',
      value: stats.totalRentalRequests,
      icon: FileText,
    },

    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: Clock,
    },

    {
      title: 'Active Rentals',
      value: stats.activeRentals,
      icon: Home,
    },

    {
      title: 'Revenue',
      value: `৳ ${stats.totalRevenue}`,
      icon: DollarSign,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Monitor and manage the RentNest platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
                </div>

                <Icon className="h-8 w-8 text-primary" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Rental Overview</h2>

          <div className="mt-5 space-y-3">
            <p>
              Active Rentals:
              <span className="font-bold ml-2">{stats.activeRentals}</span>
            </p>

            <p>
              Completed Rentals:
              <span className="font-bold ml-2">{stats.completedRentals}</span>
            </p>

            <p>
              Pending Requests:
              <span className="font-bold ml-2">{stats.pendingRequests}</span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Platform Summary</h2>

          <p className="mt-4 text-muted-foreground">
            RentNest currently has <b>{stats.totalUsers}</b> users managing{' '}
            <b>{stats.totalProperties}</b> properties.
          </p>
        </div>
      </div>
    </div>
  )
}
