'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { createReview } from '@/services/review.service'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface Props {
  rentalRequestId: string
  onSuccess?: () => void
}

export default function ReviewDialog({ rentalRequestId, onSuccess }: Props) {
  const [open, setOpen] = useState(false)

  const [rating, setRating] = useState(5)

  const [comment, setComment] = useState('')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error('Please enter a review')

      return
    }

    try {
      setLoading(true)

      await createReview({
        rentalRequestId,
        rating,
        comment,
      })

      toast.success('Review submitted successfully')

      setComment('')
      setRating(5)

      setOpen(false)

      onSuccess?.()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to submit review',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Leave Review</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <label className="font-medium">Rating (1 - 5)</label>

            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="font-medium">Comment</label>

            <Textarea
              rows={5}
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
