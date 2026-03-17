import { z } from 'zod';

export const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Phone number is too short'),
  destination: z.string().min(2, 'Destination is required'),
  travelers: z.coerce.number().min(1).max(20),
  travelDate: z.string().min(1, 'Travel date is required'),
  dateFlexibility: z.enum(['fixed', 'flexible']),
  budgetRange: z.enum(['<50k', '50k-1L', '1L-2L', '>2L']),
  message: z.string().max(500).optional().or(z.literal('')),
  packageId: z.string().optional()
});

export const reviewSchema = z.object({
  packageId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5)
});
