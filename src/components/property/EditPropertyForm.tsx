'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { getPropertyById, updateProperty } from '@/services/property.service'

import MultiImageUpload from '@/components/shared/MultiImageUpload'

interface Props {
  id: string
}

export default function EditPropertyForm({ id }: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
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
    images: [] as string[],
  })

  const loadProperty = async () => {
    try {
      const response = (await getPropertyById(id)) as {
        property: {
          title: string
          location: string
          address: string
          description: string
          rentAmount: string | number
          bedrooms: number
          bathrooms: number
          area?: number
          propertyType: string
          amenities?: string
          images?: string[]
        }
      }

      const property = response.property

      setForm({
        title: property.title,
        location: property.location,
        address: property.address,
        description: property.description,
        rentAmount: String(property.rentAmount),
        bedrooms: String(property.bedrooms),
        bathrooms: String(property.bathrooms),
        area: property.area ? String(property.area) : '',
        propertyType: property.propertyType,
        amenities: property.amenities || '',
        images: property.images || [],
      })
    } catch {
      toast.error('Failed to load property')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchProperty = async () => {
      await loadProperty()
    }

    fetchProperty()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateProperty(id, {
        ...form,

        rentAmount: Number(form.rentAmount),

        bedrooms: Number(form.bedrooms),

        bathrooms: Number(form.bathrooms),

        area: form.area ? Number(form.area) : undefined,
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
      <MultiImageUpload
        value={form.images}
        onChange={(images) =>
          setForm((prev) => ({
            ...prev,
            images,
          }))
        }
      />

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
          placeholder="Bedrooms"
        />

        <Input
          name="bathrooms"
          type="number"
          value={form.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
        />

        <Input
          name="area"
          type="number"
          value={form.area}
          onChange={handleChange}
          placeholder="Area"
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

      <Button className="w-full" type="submit">
        Update Property
      </Button>
    </form>
  )
}
