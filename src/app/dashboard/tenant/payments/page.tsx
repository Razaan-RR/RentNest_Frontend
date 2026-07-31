'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getMyPayments } from '@/services/payment.service'

import { Button } from '@/components/ui/button'

interface Payment {
  id: string
  amount: string
  status: string
  provider: string
  currency: string
  paidAt: string | null
  createdAt: string

  rentalRequest: {
    id: string

    property: {
      id: string
      title: string
      location: string
      rentAmount: string
      propertyType: string
    }
  }
}

export default function TenantPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    try {
      const response = await getMyPayments()

      setPayments(response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="py-10 text-center">Loading payments...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Payments</h1>

        <p className="mt-2 text-muted-foreground">
          View all your payment history.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No payments found</h2>

          <p className="mt-2 text-muted-foreground">
            Once you pay for an approved rental request, it will appear here.
          </p>

          <Button asChild className="mt-6">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    {payment.rentalRequest.property.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {payment.rentalRequest.property.location}
                  </p>

                  <p>
                    <strong>Amount:</strong> {payment.amount}{' '}
                    {payment.currency.toUpperCase()}
                  </p>

                  <p>
                    <strong>Provider:</strong> {payment.provider}
                  </p>

                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-semibold ${
                        payment.status === 'COMPLETED'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </p>

                  <p>
                    <strong>Paid At:</strong>{' '}
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleString()
                      : 'Not Paid'}
                  </p>
                </div>

                <div>
                  <Button asChild variant="outline">
                    <Link
                      href={`/properties/${payment.rentalRequest.property.id}`}
                    >
                      View Property
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
