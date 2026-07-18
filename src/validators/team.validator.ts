import { z } from 'zod';

export const createTeamSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  manager: z.string().min(1, 'Manager name is required').max(100, 'Manager name is too long'),
  averageRating: z.number().min(0).max(5).optional(),
  logo: z.string().nullable().optional(),
  managerAvatar: z.string().nullable().optional(),
});

export const updateTeamSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
  manager: z
    .string()
    .min(1, 'Manager name is required')
    .max(100, 'Manager name is too long')
    .optional(),
  averageRating: z.number().min(0).max(5).optional(),
  logo: z.string().nullable().optional(),
  managerAvatar: z.string().nullable().optional(),
});
