import { z } from "zod";

export const GetAllTestsResponseSchema = z.object({
	id: z.string(),
	testName: z.string(),
	description: z.string().optional(),
	isPublished: z.boolean(),
});

export type GetAllTestsResponse = z.infer<typeof GetAllTestsResponseSchema>;
