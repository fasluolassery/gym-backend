import { z } from 'zod';

export const updateMatchScoreSchema = z.object({
  homeScore: z.number().min(0).nullable(),
  awayScore: z.number().min(0).nullable(),
  isCompleted: z.boolean(),
});
