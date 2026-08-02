'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getMyProperties } from '@/services/property.service'
import { getLandlordRequests } from '@/services/rentalRequest.service'

export default function LandlordDashboardPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await getMyProperties()
        const requestData = await getLandlordRequests()

        setProperties(propertyData.properties || [])

        setRequests(requestData.rentalRequests || [])
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to load dashboard',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  const activeRequests = requests.filter(
    (item) => item.status === 'ACTIVE',
  ).length

  const approvedRequests = requests.filter(
    (item) => item.status === 'APPROVED',
  ).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Landlord Dashboard</h1>

        <p className="text-muted-foreground">
          Manage your properties and rentals
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="border rounded-xl p-6">
          <h2 className="text-sm text-muted-foreground">Total Properties</h2>

          <p className="text-3xl font-bold">{properties.length}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-sm text-muted-foreground">Active Rentals</h2>

          <p className="text-3xl font-bold">{activeRequests}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-sm text-muted-foreground">Pending Approval</h2>

          <p className="text-3xl font-bold">{approvedRequests}</p>
        </div>
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Properties</h2>

        <div className="space-y-3">
          {properties.slice(0, 5).map((property) => (
            <div
              key={property.id}
              className="flex justify-between border-b pb-3"
            >
              <span>{property.title}</span>

              <span>৳{property.rentAmount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
