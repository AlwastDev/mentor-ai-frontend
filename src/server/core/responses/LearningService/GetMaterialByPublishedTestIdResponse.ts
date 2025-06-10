import { z } from "zod";

export const getMaterialByPublishedTestIdResponseSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	content: z.string(),
});

export type GetMaterialByPublishedTestIdResponse = z.infer<
	typeof getMaterialByPublishedTestIdResponseSchema
>;
