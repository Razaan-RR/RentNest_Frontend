'use client'

import { useEffect, useState } from 'react'
import { getCategories } from '@/services/property.service'

interface FilterProps {
  onFilter: (filters: Record<string, string>) => void
}
interface Category {
  id: string
  name: string
}

export default function PropertyFilter({ onFilter }: FilterProps) {
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [amenities, setAmenities] = useState('')

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      const response = (await getCategories()) as {
        categories: Category[]
      }

      setCategories(response.categories)
    }

    loadCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const filters: Record<string, string> = {}

    if (location) filters.location = location

    if (propertyType) filters.propertyType = propertyType

    if (categoryId) filters.categoryId = categoryId

    if (amenities) filters.amenities = amenities

    if (minPrice) filters.minPrice = minPrice

    if (maxPrice) filters.maxPrice = maxPrice

    onFilter(filters)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
      rounded-xl
      border
      p-5
      space-y-4
      "
    >
      <h2 className="text-lg font-semibold">Filters</h2>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border rounded-md p-2 w-full"
      />

      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="border rounded-md p-2 w-full"
      >
        <option value="">Property Type</option>

        <option value="Apartment">Apartment</option>

        <option value="House">House</option>

        <option value="Studio">Studio</option>
      </select>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border rounded-md p-2 w-full"
      >
        <option value="">Category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Amenities (example: Parking)"
        value={amenities}
        onChange={(e) => setAmenities(e.target.value)}
        className="border rounded-md p-2 w-full"
      />

      <input
        type="number"
        placeholder="Minimum Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded-md p-2 w-full"
      />

      <input
        type="number"
        placeholder="Maximum Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border rounded-md p-2 w-full"
      />

      <button
        className="
        w-full
        rounded-md
        bg-primary
        text-primary-foreground
        py-2
        "
      >
        Search
      </button>
    </form>
  )
}
