import { apiRequest } from '@/lib/api'

interface PropertyData {
  title: string
  location: string
  address: string
  description: string
  rentAmount: number
  bedrooms: number
  bathrooms: number
  area?: number
  propertyType: string
  amenities: string
  categoryId?: string
  images?: string[]
}

export const getMyProperties = async () => {
  return apiRequest('/properties/landlord/my-properties', {
    method: 'GET',
  })
}

export const createProperty = async (data: PropertyData) => {
  return apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const updateProperty = async (
  id: string,
  data: Partial<PropertyData>,
) => {
  return apiRequest(`/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export const deleteProperty = async (id: string) => {
  return apiRequest(`/properties/${id}`, {
    method: 'DELETE',
  })
}