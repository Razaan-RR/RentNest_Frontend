import { apiRequest } from '@/lib/api'

export const updateProfile = async (data: any) => {
  return apiRequest('/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export const getProfile = async () => {
  return apiRequest('/profile', {
    method: 'GET',
  })
}