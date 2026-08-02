'use client'

import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface Props {
  property: any
  onDelete: (id: string) => void
}

export default function PropertyCard({ property, onDelete }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">{property.title}</h2>

        <p className="text-muted-foreground">{property.location}</p>

        <p>
          <strong>Rent:</strong> ৳{property.rentAmount}/month
        </p>

        <p>
          <strong>Category:</strong> {property.category?.name}
        </p>

        <p>
          <strong>Status:</strong>{' '}
          <span
            className={`font-semibold ${
              property.availability === 'AVAILABLE'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {property.availability}
          </span>
        </p>

        <div className="flex gap-3 pt-2">
          <Button asChild>
            <Link href={`/dashboard/landlord/properties/${property.id}/edit`}>
              Edit
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this category.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
