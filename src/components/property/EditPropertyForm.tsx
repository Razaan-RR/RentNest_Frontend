'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { getPropertyById, updateProperty } from '@/services/property.service'

interface Props {
  id: string
}

export default function EditPropertyForm({ id }: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState<any>({
    title: '',
    location: '',
    address: '',
    description: '',
    rentAmount: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyType: '',
    amenities: '',
  })

  useEffect(() => {
    loadProperty()
  }, [])

  const loadProperty = async () => {
    try {
      const response = await getPropertyById(id)

      const property = response.property

      setForm({
        title: property.title,
        location: property.location,
        address: property.address,
        description: property.description,
        rentAmount: property.rentAmount,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        propertyType: property.propertyType,
        amenities: property.amenities,
      })
    } catch (error) {
      toast.error('Failed to load property')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateProperty(id, {
        ...form,

        rentAmount: Number(form.rentAmount),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
      })

      toast.success('Property updated successfully')

      router.push('/dashboard/landlord/properties')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Update failed')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border rounded-xl p-6">
      <Input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <Input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
      />

      <Input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
      />

      <Textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <Input
        name="rentAmount"
        type="number"
        value={form.rentAmount}
        onChange={handleChange}
        placeholder="Rent"
      />

      <div className="grid md:grid-cols-3 gap-4">
        <Input
          name="bedrooms"
          type="number"
          value={form.bedrooms}
          onChange={handleChange}
        />

        <Input
          name="bathrooms"
          type="number"
          value={form.bathrooms}
          onChange={handleChange}
        />

        <Input
          name="area"
          type="number"
          value={form.area}
          onChange={handleChange}
        />
      </div>

      <Input
        name="propertyType"
        value={form.propertyType}
        onChange={handleChange}
        placeholder="Property Type"
      />

      <Input
        name="amenities"
        value={form.amenities}
        onChange={handleChange}
        placeholder="Amenities"
      />

      <Button className="w-full">Update Property</Button>
    </form>
  )
}
