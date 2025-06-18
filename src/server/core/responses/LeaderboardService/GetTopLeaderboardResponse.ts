import { z } from "zod";

export const getTopLeaderboardResponseSchema = z.object({
  id: z.string().uuid(),
  studentId: z.string().uuid(),
  name: z.string().optional(),
  rank: z.number().int(),
  coins: z.number().int(),
  experience: z.number().int(),
})

export type GetTopLeaderboardResponse = z.infer<typeof getTopLeaderboardResponseSchema>;