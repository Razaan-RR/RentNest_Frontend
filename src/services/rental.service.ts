import { apiRequest } from '@/lib/api'

export interface RentalRequestPayload {
  propertyId: string
  moveInDate: string
  duration: number
  message?: string
}

export const createRentalRequest = async (payload: RentalRequestPayload) => {
  return apiRequest('/rentals', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const getMyRentalRequests = async () => {
  return apiRequest('/rentals', {
    method: 'GET',
  })
}

export const getRentalRequest = async (id: string) => {
  return apiRequest(`/rentals/${id}`, {
    method: 'GET',
  })
}

