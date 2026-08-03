'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { createProperty } from '@/services/property.service'
import { getCategories } from '@/services/category.service'

import MultiImageUpload from '../shared/MultiImageUpload'

interface Category {
  id: string
  name: string
}

interface PropertyFormState {
  title: string
  location: string
  address: string
  description: string
  rentAmount: string
  bedrooms: string
  bathrooms: string
  area: string
  propertyType: string
  amenities: string
  categoryId: string
  images: string[]
}

export default function PropertyForm() {
  const router = useRouter()

  const [categories, setCategories] = useState<Category[]>([])

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<PropertyFormState>({
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
    categoryId: '',
    images: [],
  })

  const loadCategories = async () => {
    try {
      const response = (await getCategories()) as {
        categories: Category[]
      }

      setCategories(response.categories)
    } catch {
      toast.error('Failed to load categories')
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      await loadCategories()
    }

    fetchCategories()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.images.length === 0) {
      toast.error('Please upload at least one property image')
      return
    }

    try {
      setLoading(true)

      await createProperty({
        ...form,

        rentAmount: Number(form.rentAmount),

        bedrooms: Number(form.bedrooms),

        bathrooms: Number(form.bathrooms),

        area: form.area ? Number(form.area) : undefined,
      })

      toast.success('Property created successfully')

      router.push('/dashboard/landlord/properties')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create property',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border rounded-xl p-6">
      <MultiImageUpload
        value={form.images}
        onChange={(images) => {
          setForm((prev) => ({
            ...prev,
            images,
          }))
        }}
      />

      <Input
        name="title"
        placeholder="Property title"
        value={form.title}
        onChange={handleChange}
      />

      <Input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />

      <Input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <Textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <Input
        name="rentAmount"
        type="number"
        placeholder="Monthly rent"
        value={form.rentAmount}
        onChange={handleChange}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <Input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
        />

        <Input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
        />

        <Input
          name="area"
          type="number"
          placeholder="Area sqft"
          value={form.area}
          onChange={handleChange}
        />
      </div>

      <Input
        name="propertyType"
        placeholder="Apartment / House"
        value={form.propertyType}
        onChange={handleChange}
      />

      <Input
        name="amenities"
        placeholder="Amenities (comma separated)"
        value={form.amenities}
        onChange={handleChange}
      />

      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      >
        <option value="">Select category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating...' : 'Create Property'}
      </Button>
    </form>
  )
}
