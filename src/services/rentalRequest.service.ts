import { apiRequest } from '@/lib/api'

interface RentalRequest {
  id: string
  status: string
  duration: number
  moveInDate: string

  property: {
    title: string
    location: string
    rentAmount: string

    landlord: {
      name: string
      email: string
    }
  }
}

interface RentalRequest {
  id: string
  status: string
  duration: number
  moveInDate: string

  property: {
    title: string
    location: string
    rentAmount: string

    landlord: {
      name: string
      email: string
    }
  }

  tenant: {
    name: string
    email: string
  }
}

interface RentalRequestsResponse {
  rentalRequests: RentalRequest[]
}

// Tenant: Get my rental requests
export const getMyRentalRequests =
  async (): Promise<RentalRequestsResponse> => {
    return apiRequest('/rentals', {
      method: 'GET',
    })
  }

// Landlord: Get incoming rental requests
export const getLandlordRequests =
  async (): Promise<RentalRequestsResponse> => {
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
