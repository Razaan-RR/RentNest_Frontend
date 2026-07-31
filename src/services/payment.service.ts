import { apiRequest } from '@/lib/api'

export const createPayment = async (rentalRequestId: string) => {
  return apiRequest('/payments/create', {
    method: 'POST',
    body: JSON.stringify({ rentalRequestId }),
  })
}

export const confirmPayment = async (checkoutSessionId: string) => {
  return apiRequest('/payments/confirm', {
    method: 'POST',
    body: JSON.stringify({ checkoutSessionId }),
  })
}

export const getMyPayments = async () => {
  return apiRequest('/payments', {
    method: 'GET',
  })
}

export const getPayment = async (id: string) => {
  return apiRequest(`/payments/${id}`, {
    method: 'GET',
  })
}
