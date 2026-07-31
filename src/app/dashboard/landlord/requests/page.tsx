'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  getLandlordRequests,
  updateRentalRequestStatus,
} from '@/services/rentalRequest.service'

export default function LandlordRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const data = await getLandlordRequests()

      setRequests(data.rentalRequests || [])
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch requests',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const updateStatus = async (
    id: string,
    status: 'APPROVED' | 'REJECTED' | 'COMPLETED',
  ) => {
    try {
      await updateRentalRequestStatus(id, status)

      toast.success(`Request ${status.toLowerCase()}`)

      fetchRequests()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
      )
    }
  }

  if (loading) {
    return <div>Loading requests...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rental Requests</h1>

        <p className="text-muted-foreground">
          Manage tenant rental applications
        </p>
      </div>

      {requests.length === 0 ? (
        <p>No rental requests found</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border rounded-lg p-5 space-y-3">
              <h2 className="font-semibold text-lg">
                {request.property.title}
              </h2>

              <div>Tenant: {request.tenant.name}</div>

              <div>Email: {request.tenant.email}</div>

              <div>
                Move in: {new Date(request.moveInDate).toLocaleDateString()}
              </div>

              <div>Duration: {request.duration} months</div>

              <div>Status: {request.status}</div>

              {request.status === 'PENDING' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(request.id, 'APPROVED')}
                    className="px-4 py-2 rounded bg-green-600 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(request.id, 'REJECTED')}
                    className="px-4 py-2 rounded bg-red-600 text-white"
                  >
                    Reject
                  </button>
                </div>
              )}
              {request.status === 'ACTIVE' && (
                <button
                  onClick={() => updateStatus(request.id, 'COMPLETED')}
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Complete Rental
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
