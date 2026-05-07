import { z } from 'zod';
import { REQUIREMENT_TYPES } from '../constants';

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(1, 'City is required'),
  requirementType: z.enum(REQUIREMENT_TYPES, {
    message: 'Please select a requirement type',
  }),
  budgetRange: z.string().min(1, 'Budget range is required'),
  message: z.string().optional(),
  couponCode: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
