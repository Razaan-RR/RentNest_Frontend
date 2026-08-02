'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getMyRentalRequests } from '@/services/rentalRequest.service'

export default function TenantRentalsPage() {
  const [rentals, setRentals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getMyRentalRequests()

        const activeRentals = (data.rentalRequests || []).filter(
          (item: any) => item.status === 'ACTIVE',
        )

        setRentals(activeRentals)
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to load rentals',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchRentals()
  }, [])

  if (loading) {
    return <div>Loading active rentals...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Active Rentals</h1>

        <p className="text-muted-foreground">
          Properties you are currently renting
        </p>
      </div>

      {rentals.length === 0 ? (
        <div
          className="
            border
            rounded-xl
            p-6
          "
        >
          No active rentals found
        </div>
      ) : (
        <div className="space-y-5">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="
                    border
                    rounded-xl
                    p-6
                    space-y-4
                  "
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {rental.property.title}
                </h2>

                <p className="text-muted-foreground">
                  {rental.property.location}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Rent</p>

                  <p className="font-medium">৳ {rental.property.rentAmount}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>

                  <p className="font-medium">{rental.duration} months</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Move In Date</p>

                  <p className="font-medium">
                    {new Date(rental.moveInDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>

                  <span
                    className="
                          inline-block
                          mt-1
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          bg-green-100
                          text-green-700
                        "
                  >
                    ACTIVE
                  </span>
                </div>
              </div>

              <div
                className="
                    border-t
                    pt-4
                  "
              >
                <h3 className="font-semibold">Landlord Information</h3>

                <p>{rental.property.landlord.name}</p>

                <p className="text-sm text-muted-foreground">
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
