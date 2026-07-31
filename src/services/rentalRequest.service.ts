import { apiRequest } from '@/lib/api'

export const getLandlordRequests = async () => {
  return apiRequest('/rentals/landlord', {
    method: 'GET',
  })
}

export const updateRentalRequestStatus = async (
  id: string,
  status: 'APPROVED' | 'REJECTED' | 'COMPLETED',
) => {
  return apiRequest(`/rentals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
    }),
  })
}
