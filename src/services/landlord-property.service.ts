import { apiRequest } from '@/lib/api'

export const getMyProperties = async () => {
  return apiRequest('/properties/landlord/my-properties', {
    method: 'GET',
  })
}

export const createProperty = async (data: any) => {
  return apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const updateProperty = async (id: string, data: any) => {
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
