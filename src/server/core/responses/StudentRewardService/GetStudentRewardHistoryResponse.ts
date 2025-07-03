import { z } from "zod";

export const StudentRewardHistoryEntrySchema = z.object({
	id: z.string(),
	experience: z.number(),
	creationDate: z.string(),
});

export const GetStudentRewardHistoryResponseSchema = z.array(StudentRewardHistoryEntrySchema);

export type GetStudentRewardHistoryResponse = z.infer<typeof StudentRewardHistoryEntrySchema>; 