'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getMyReviews } from '@/services/review.service'
import { Badge } from '@/components/ui/badge'

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string

  property: {
    id: string
    title: string
    location: string
  }
}

export default function TenantReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const response = await getMyReviews()

      setReviews(response.reviews || [])
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load reviews',
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="py-10 text-center">Loading reviews...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Reviews</h1>

        <p className="mt-2 text-muted-foreground">
          Reviews you've submitted for completed rentals.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-xl border p-12 text-center">
          <h2 className="text-xl font-semibold">No reviews yet</h2>

          <p className="mt-2 text-muted-foreground">
            Complete a rental to submit your first review.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {review.property.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {review.property.location}
                  </p>
                </div>

                <Badge>⭐ {review.rating}/5</Badge>
              </div>

              <p className="mt-5 leading-7">{review.comment}</p>

              <p className="mt-5 text-sm text-muted-foreground">
                Submitted on {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
