import { z } from "zod";

import { DESKTOP_PAGE_SIZE } from "../utils/constants";

export const paginationSchema = z.object({
	page: z.number().min(1).default(1),
	limit: z.number().min(1).default(DESKTOP_PAGE_SIZE),
});
