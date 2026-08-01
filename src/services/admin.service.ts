import { apiRequest } from '@/lib/api'

export const getAdminStats = async () => {
  return apiRequest('/admin/stats', {
    method: 'GET',
  })
}

export const getAdminUsers = async () => {
  return apiRequest('/admin/users', {
    method: 'GET',
  })
}

export const updateUserStatus = async (
  id: string,
  activeStatus: 'ACTIVE' | 'BANNED',
) => {
  return apiRequest(`/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      activeStatus,
    }),
  })
}

export const getAdminProperties = async () => {
  return apiRequest('/admin/properties', {
    method: 'GET',
  })
}

export const getAdminRentals = async () => {
  return apiRequest('/admin/rentals', {
    method: 'GET',
  })
}
