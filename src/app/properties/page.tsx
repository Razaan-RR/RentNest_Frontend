'use client'

import { useEffect, useState } from 'react'
import { getProperties } from '@/services/property.service'
import PropertyCard from '@/components/property/PropertyCard'
import PropertyFilter from '@/components/property/PropertyFilter'
import PropertyCardSkeleton from '@/components/property/PropertyCardSkeleton'

interface Property {
  id: string
  title: string
  description: string
  location: string
  rentAmount: string
  bedrooms: number
  bathrooms: number
  area: number
  propertyType: string
  amenities: string
  availability: string
  images: string[]
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const loadProperties = async (filters?: Record<string, string>) => {
    try {
      setLoading(true)

      const response = (await getProperties(filters)) as {
        properties: Property[]
      }

      setProperties(response.properties)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>

      <div
        className="
      grid
      grid-cols-1
      lg:grid-cols-4
      gap-6
      "
      >
        <PropertyFilter onFilter={loadProperties} />

        <div
          className="
        lg:col-span-3
        grid
        md:grid-cols-2
        gap-6
        "
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            : properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
        </div>
      </div>
    </main>
  )
}
