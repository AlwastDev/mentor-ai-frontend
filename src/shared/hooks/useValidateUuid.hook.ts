import { z } from "zod";

const ParamsSchema = z.object({
	id: z.string().uuid(),
});

export const useValidateUuid = (uuid: string) => {
	const parseResult = ParamsSchema.safeParse({ id: uuid });

	if (!parseResult.success) {
		return false;
	}

	return true;
};