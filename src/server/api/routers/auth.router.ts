import { createTRPCRouter, publicProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { IAuthService } from "@/server/core/services/interfaces/IAuthService";
import { loginInputSchema } from "@/server/core/schemas/AuthService/login.schema";
import { registerInputSchema } from "@/server/core/schemas/AuthService/register.schema";

const authService = container.get<IAuthService>(SYMBOLS.IAuthService);

export const authRouter = createTRPCRouter({
	login: publicProcedure
		.input(loginInputSchema)
		.mutation(async ({ input }) => authService.login({ ...input })),

	register: publicProcedure
		.input(registerInputSchema)
		.mutation(async ({ input }) => authService.register({ ...input })),
});
