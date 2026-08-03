import { apiRequest } from '@/lib/api'

interface Profile {
  phone?: string
  avatar?: string
  dateOfBirth?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  bio?: string
}

export const updateProfile = async (data: Profile) => {
  return apiRequest('/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export const getProfile = async (): Promise<Profile> => {
  return apiRequest('/profile', {
    method: 'GET',
  })
}