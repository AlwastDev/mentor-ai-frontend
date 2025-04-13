import { createTRPCRouter, publicProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import { ITokenService } from "@/server/core/services/interfaces/ITokenService";

const tokenService = container.get<ITokenService>(SYMBOLS.ITokenService);

export const tokenRouter = createTRPCRouter({
	getOverview: publicProcedure.query(async () => tokenService.getOverview()),

	getTokenPrice: publicProcedure.query(async () =>
		tokenService.getTokenPrice()
	),
});
