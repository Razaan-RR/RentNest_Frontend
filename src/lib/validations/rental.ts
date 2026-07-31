import { z } from 'zod'

export const rentalSchema = z.object({
  moveInDate: z.string().min(1, 'Move-in date is required'),

  duration: z.number().min(1, 'Minimum 1 month').max(24, 'Maximum 24 months'),

  message: z.string().optional(),
})

export type RentalFormData = z.infer<typeof rentalSchema>
