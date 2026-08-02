'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import {
  getMyProperties,
  deleteProperty,
} from '@/services/landlord-property.service'

import PropertyCard from '@/components/landlord/PropertyCard'

import { Button } from '@/components/ui/button'

import { toast } from 'sonner'

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      const response = await getMyProperties()

      setProperties(response.properties)
    } catch {
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id)

      toast.success('Property deleted')

      loadProperties()
    } catch (error: any) {
      toast.error(error.message || 'Delete failed')
    }
  }

  if (loading) {
    return <div className="py-10 text-center">Loading properties...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Properties</h1>

          <p className="mt-2 text-muted-foreground">
            Manage all your rental properties.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/landlord/properties/create">Add Property</Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No properties found</h2>

          <Button asChild className="mt-6">
            <Link href="/dashboard/landlord/properties/create">
              Add Your First Property
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
