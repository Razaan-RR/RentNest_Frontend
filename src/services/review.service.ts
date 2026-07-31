import { apiRequest } from '@/lib/api'

export interface CreateReviewPayload {
  rentalRequestId: string
  rating: number
  comment: string
}

export const createReview = async (payload: CreateReviewPayload) => {
  return apiRequest('/reviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const getPropertyReviews = async (propertyId: string) => {
  return apiRequest(`/reviews/property/${propertyId}`, {
    method: 'GET',
  })
}

export const getMyReviews = async () => {
  return apiRequest('/reviews/my', {
    method: 'GET',
  })
}