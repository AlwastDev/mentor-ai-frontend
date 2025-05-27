import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { ZodError } from "zod";
import * as cookie from "cookie";

import { UserRole } from "@/shared/utils/enums";
import { env } from "@/env.mjs";
import { jwtVerify } from "jose";


export function createTRPCContext({ req }: FetchCreateContextFnOptions) {
	const parsedCookies = cookie.parse(req.headers.get("cookie") ?? "");

	return {
		req,
		cookies: parsedCookies,
	};
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const isAuthed = t.middleware(({ ctx, next }) => {
	if (!ctx.cookies.access_token) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			access_token: ctx.cookies.access_token!,
		},
	});
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(isAuthed);

function createRoleMiddleware(allowedRoles: UserRole[]) {
	return t.middleware(async ({ ctx, next }) => {
		if (!ctx.cookies.access_token) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const secret = new TextEncoder().encode(env.SECRET_KEY);

		const { payload } = await jwtVerify(ctx.cookies.access_token!, secret);

		const userRole = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as UserRole;

		if (!allowedRoles.includes(userRole!)) {
			throw new TRPCError({ code: "FORBIDDEN" });
		}
		
		return next({
			ctx: {
				access_token: ctx.cookies.access_token,
			},
		});
	});
}

export const isStudent = createRoleMiddleware([UserRole.STUDENT]);

export const studentProcedure = protectedProcedure.use(isStudent);

export const isAdmin = createRoleMiddleware([UserRole.ADMIN]);

export const adminProcedure = protectedProcedure.use(isAdmin);
