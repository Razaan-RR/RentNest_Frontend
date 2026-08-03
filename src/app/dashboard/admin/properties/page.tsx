'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getAdminProperties } from '@/services/admin.service'

interface Property {
  id: string

  title: string

  location: string

  rentAmount: string

  propertyType: string

  availability: string

  landlord: {
    name: string
    email: string
  }

  category: {
    name: string
  }
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])

  const [loading, setLoading] = useState(true)

  const loadProperties = async () => {
    try {
      const response = (await getAdminProperties()) as {
        properties: Property[]
      }

      setProperties(response.properties || [])
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load properties',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchProperties = async () => {
      await loadProperties()
    }

    fetchProperties()
  }, [])

  if (loading) {
    return <div className="py-10 text-center">Loading properties...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Property Management</h1>

        <p className="text-muted-foreground mt-2">
          Monitor all rental listings.
        </p>
      </div>

      <div className="grid gap-5">
        {properties.map((property) => (
          <div
            key={property.id}
            className="
              rounded-xl
              border
              p-6
              space-y-3
              "
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{property.title}</h2>

              <span
                className="
                  rounded-full
                  bg-muted
                  px-3
                  py-1
                  text-sm
                  "
              >
                {property.availability}
              </span>
            </div>

            <p>📍 {property.location}</p>

            <p>💰 ৳ {property.rentAmount}</p>

            <p>Type: {property.propertyType}</p>

            <p>Category: {property.category?.name}</p>

            <div
              className="
                border-t
                pt-3
              "
            >
              <p className="font-medium">Landlord</p>

              <p>{property.landlord.name}</p>

              <p className="text-muted-foreground">{property.landlord.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
