'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getPropertyReviews } from '@/services/review.service'
import { Badge } from '@/components/ui/badge'

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string

  tenant: {
    name: string
  }
}

interface Props {
  propertyId: string
}

export default function PropertyReviews({ propertyId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const loadReviews = async () => {
    try {
      const response = (await getPropertyReviews(propertyId)) as {
        reviews: Review[]
      }

      setReviews(response.reviews || [])
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load reviews',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchReviews = async () => {
      await loadReviews()
    }

    fetchReviews()
  }, [propertyId])

  if (loading) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <p>Loading reviews...</p>
      </section>
    )
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-muted-foreground">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{review.tenant.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Badge>⭐ {review.rating}/5</Badge>
              </div>

              <p className="mt-4 leading-7">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
