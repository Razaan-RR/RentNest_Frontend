'use client'

import { useEffect, useState } from 'react'

import { getMyRentalRequests } from '@/services/rental.service'
import StatusBadge from '@/components/rental/StatusBadge'

interface RentalRequest {
  id: string
  status: string
  moveInDate: string
  duration: number
  property: {
    title: string
    location: string
    rentAmount: string
  }
}

export default function TenantDashboard() {
  const [requests, setRequests] = useState<RentalRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      const res = await getMyRentalRequests()
      setRequests(res.rentalRequests)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p>Loading requests...</p>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Rental Requests</h1>

      {requests.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          No rental requests yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="rounded-xl border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {request.property.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {request.property.location}
                  </p>

                  <p className="mt-2 font-medium">
                    ৳ {request.property.rentAmount} / month
                  </p>

                  <p className="mt-2 text-sm">
                    Move In: {new Date(request.moveInDate).toLocaleDateString()}
                  </p>

                  <p className="text-sm">Duration: {request.duration} months</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <StatusBadge status={request.status} />

                  {request.status === 'APPROVED' && (
                    <button className="rounded bg-blue-600 px-4 py-2 text-white">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
