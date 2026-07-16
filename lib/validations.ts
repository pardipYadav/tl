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

export const contactInquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
  email: z.string().trim().email('Enter a valid email address').max(120),
  phone: z
    .string()
    .trim()
    .min(8, 'Contact number is too short')
    .max(20, 'Contact number is too long')
    .regex(/^[+\d][\d\s\-()]{7,19}$/, 'Enter a valid contact number'),
  destination: z
    .string()
    .trim()
    .min(2, 'Destination is required')
    .max(100, 'Destination is too long'),
  numberOfDays: z.coerce
    .number({ invalid_type_error: 'Enter number of days' })
    .int('Days must be a whole number')
    .min(1, 'Trip must be at least 1 day')
    .max(365, 'Trip cannot exceed 365 days')
});

export const reviewSchema = z.object({
  packageId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5)
});
