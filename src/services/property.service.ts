import { apiRequest } from '@/lib/api'

// Get all properties with optional filters
export const getProperties = async (filters?: Record<string, string>) => {
  const query = filters ? new URLSearchParams(filters).toString() : ''

  return apiRequest(`/properties${query ? `?${query}` : ''}`, {
    method: 'GET',
  })
}

// Get single property details
export const getPropertyById = async (id: string) => {
  return apiRequest(`/properties/${id}`, {
    method: 'GET',
  })
}

// Get all property categories
export const getCategories = async () => {
  return apiRequest('/categories', {
    method: 'GET',
  })
}

// Landlord: Get own properties
export const getMyProperties = async () => {
  return apiRequest('/properties/landlord/my-properties', {
    method: 'GET',
  })
}

// Landlord: Create property
export const createProperty = async (data: any) => {
  return apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Landlord: Update property
export const updateProperty = async (id: string, data: any) => {
  return apiRequest(`/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// Landlord: Delete property
export const deleteProperty = async (id: string) => {
  return apiRequest(`/properties/${id}`, {
    method: 'DELETE',
  })
}
