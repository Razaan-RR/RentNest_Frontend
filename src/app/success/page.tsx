'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

import { confirmPayment } from '@/services/payment.service'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  const searchParams = useSearchParams()

  const sessionId = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  const confirm = async () => {
    if (!sessionId) {
      setLoading(false)
      return
    }

    try {
      await confirmPayment(sessionId)

      setSuccess(true)

      toast.success('Payment completed successfully!')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Payment confirmation failed',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const verifyPayment = async () => {
      await confirm()
    }

    verifyPayment()
  }, [sessionId])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Confirming your payment...</p>
      </div>
    )
  }

  if (!success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-red-600">
          Payment Confirmation Failed
        </h1>

        <p className="text-muted-foreground">We couldnt verify your payment.</p>

        <Button asChild>
          <Link href="/dashboard/tenant/payments">Back to Payments</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <CheckCircle2 className="h-20 w-20 text-green-600" />

      <h1 className="text-4xl font-bold">Payment Successful!</h1>

      <p className="text-muted-foreground text-center max-w-md">
        Your payment has been confirmed successfully. Your rental is now active.
      </p>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard/tenant/payments">View Payments</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/dashboard/tenant/requests">My Requests</Link>
        </Button>
      </div>
    </div>
  )
}
