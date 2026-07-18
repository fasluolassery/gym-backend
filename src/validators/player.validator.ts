import { z } from 'zod';

export const createPlayerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  position: z.enum(['GK', 'DEF', 'ATK']),
  rating: z.number().min(1).max(5),
  teamId: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  phone: z.string().nullable(),
});

export const updatePlayerSchema = createPlayerSchema.partial();
