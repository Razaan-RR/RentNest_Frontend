'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getAdminRentals } from '@/services/admin.service'

interface Rental {
  id: string

  status: string

  moveInDate: string

  duration: number

  tenant: {
    name: string
    email: string
  }

  property: {
    title: string
    location: string
    landlord: {
      name: string
      email: string
    }
  }
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([])

  const [loading, setLoading] = useState(true)

  const loadRentals = async () => {
    try {
      const response = await getAdminRentals()

      setRentals(response.rentals || [])
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load rentals',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRentals()
  }, [])

  if (loading) {
    return <div className="py-10 text-center">Loading rental requests...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Rental Requests</h1>

        <p className="text-muted-foreground mt-2">
          Monitor all rental activities.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          No rental requests found
        </div>
      ) : (
        <div className="space-y-5">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="
              rounded-xl
              border
              p-6
              space-y-4
              "
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">
                  {rental.property.title}
                </h2>

                <span
                  className="
                  rounded-full
                  bg-muted
                  px-3
                  py-1
                  text-sm
                  "
                >
                  {rental.status}
                </span>
              </div>

              <div>
                <p>📍 {rental.property.location}</p>

                <p>
                  Move In: {new Date(rental.moveInDate).toLocaleDateString()}
                </p>

                <p>Duration: {rental.duration} months</p>
              </div>

              <div className="border-t pt-3">
                <p className="font-medium">Tenant</p>

                <p>{rental.tenant.name}</p>

                <p className="text-muted-foreground">{rental.tenant.email}</p>
              </div>

              <div className="border-t pt-3">
                <p className="font-medium">Landlord</p>

                <p>{rental.property.landlord.name}</p>

                <p className="text-muted-foreground">
                  {rental.property.landlord.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
