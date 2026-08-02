'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getMyRentalRequests } from '@/services/rentalRequest.service'
import { getMyPayments } from '@/services/payment.service'

export default function TenantDashboardPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const requestData = await getMyRentalRequests()
        const paymentData = await getMyPayments()

        setRequests(requestData.rentalRequests || [])

        setPayments(paymentData || [])
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to load dashboard',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  const pending = requests.filter((item) => item.status === 'PENDING').length

  const active = requests.filter((item) => item.status === 'ACTIVE').length

  const completed = requests.filter(
    (item) => item.status === 'COMPLETED',
  ).length

  const totalPaid = payments
    .filter((item) => item.status === 'COMPLETED')
    .reduce((sum, item) => sum + Number(item.amount), 0)

  const cards = [
    {
      title: 'Total Requests',
      value: requests.length,
    },

    {
      title: 'Pending Requests',
      value: pending,
    },

    {
      title: 'Active Rentals',
      value: active,
    },

    {
      title: 'Completed Rentals',
      value: completed,
    },

    {
      title: 'Total Paid',
      value: `৳ ${totalPaid}`,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tenant Dashboard</h1>

        <p className="text-muted-foreground">
          Manage your rentals and payments
        </p>
      </div>

      <div
        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-5
        gap-5
      "
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="
                border
                rounded-xl
                p-5
                space-y-2
              "
          >
            <p className="text-sm text-muted-foreground">{card.title}</p>

            <h2 className="text-3xl font-bold">{card.value}</h2>
          </div>
        ))}
      </div>

      <div
        className="
        border
        rounded-xl
        p-6
      "
      >
        <h2 className="text-xl font-semibold mb-4">Recent Rental Requests</h2>

        {requests.slice(0, 5).map((request) => (
          <div
            key={request.id}
            className="
                flex
                justify-between
                border-b
                py-3
              "
          >
            <div>
              <p className="font-medium">{request.property.title}</p>

              <p className="text-sm text-muted-foreground">
                {request.property.location}
              </p>
            </div>

            <span>{request.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
