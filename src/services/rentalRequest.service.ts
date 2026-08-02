import { apiRequest } from '@/lib/api'

// Tenant: Get my rental requests
export const getMyRentalRequests = async () => {
  return apiRequest('/rentals', {
    method: 'GET',
  })
}

// Landlord: Get incoming rental requests
export const getLandlordRequests = async () => {
  return apiRequest('/rentals/landlord', {
    method: 'GET',
  })
}

// Landlord: Update rental request status
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
