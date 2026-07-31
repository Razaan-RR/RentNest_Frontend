'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getMyRentalRequests } from '@/services/rental.service'
import StatusBadge from '@/components/rental/StatusBadge'
import { Button } from '@/components/ui/button'

interface RentalRequest {
  id: string
  status: string
  moveInDate: string
  duration: number
  message?: string

  property: {
    id: string
    title: string
    location: string
    address: string
    rentAmount: string
    propertyType: string
  }
}

export default function TenantRequestsPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      const response = await getMyRentalRequests()

      setRequests(response.rentalRequests)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="py-10 text-center">Loading rental requests...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Rental Requests</h1>

          <p className="text-muted-foreground mt-2">
            View the status of all your rental requests.
          </p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-xl border p-12 text-center">
          <h2 className="text-xl font-semibold">No rental requests found</h2>

          <p className="mt-2 text-muted-foreground">
            Browse available properties and submit your first request.
          </p>

          <Button asChild className="mt-6">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    {request.property.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {request.property.location}
                  </p>

                  <p>
                    <span className="font-medium">Address:</span>{' '}
                    {request.property.address}
                  </p>

                  <p>
                    <span className="font-medium">Property Type:</span>{' '}
                    {request.property.propertyType}
                  </p>

                  <p>
                    <span className="font-medium">Monthly Rent:</span> ৳
                    {request.property.rentAmount}
                  </p>

                  <p>
                    <span className="font-medium">Move-in Date:</span>{' '}
                    {new Date(request.moveInDate).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="font-medium">Duration:</span>{' '}
                    {request.duration} month(s)
                  </p>

                  {request.message && (
                    <p>
                      <span className="font-medium">Message:</span>{' '}
                      {request.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-4">
                  <StatusBadge status={request.status} />

                  {request.status === 'APPROVED' && <Button>Pay Now</Button>}

                  <Button variant="outline" asChild>
                    <Link href={`/properties/${request.property.id}`}>
                      View Property
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
