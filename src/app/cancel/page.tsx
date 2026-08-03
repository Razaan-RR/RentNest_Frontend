import Link from 'next/link'

import { XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <XCircle className="h-20 w-20 text-red-500" />

      <h1 className="text-4xl font-bold">Payment Cancelled</h1>

      <p className="text-muted-foreground">
        Your payment was cancelled. No money has been charged.
      </p>

      <Link href="/dashboard/tenant/requests">
        <Button>Back to My Requests</Button>
      </Link>
    </div>
  )
}
