import { z } from 'zod';

export const createPlayerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  position: z.enum(['GK', 'DEF', 'ATK']),
  rating: z.number().min(1).max(5),
  teamId: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 13;
      },
      {
        message: 'Phone number must contain between 10 and 13 digits',
      }
    )
    .refine((val) => /^[\d\s+\-()]*$/.test(val), {
      message: 'Phone number contains invalid characters (digits, +, -, (), spaces only)',
    }),
});

export const updatePlayerSchema = createPlayerSchema.partial();
