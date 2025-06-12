import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		NEXT_PUBLIC_SITE_URL: z.string().min(1),
		BACKEND_URL: z.string().min(1),
		NODE_ENV: z.enum(["development", "test", "production"]),
		AWS_ACCESS_KEY_ID: z.string().min(1),
		AWS_SECRET_ACCESS_KEY: z.string().min(1),
		AWS_REGION: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		SERVICE_SIGNIN_SECRET: z.string().min(1),
		SECRET_KEY: z.string().min(1),
		ACCESS_TOKEN_EXPIRES_MIN: z.number().min(1),
		REFRESH_TOKEN_EXPIRES_MIN: z.number().min(1),
		LIQPAY_PRIVATE_KEY_TEST: z.string().min(1),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_LIQPAY_PUBLIC_KEY_TEST: z.string().min(1),
		NEXT_PUBLIC_CHAT_WSS_URL: z.string().min(1),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_CHAT_WSS_URL: process.env.NEXT_PUBLIC_CHAT_WSS_URL,
		BACKEND_URL: process.env.BACKEND_URL,
		NODE_ENV: process.env.NODE_ENV,
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		AWS_REGION: process.env.AWS_REGION,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		SERVICE_SIGNIN_SECRET: process.env.SERVICE_SIGNIN_SECRET,
		SECRET_KEY: process.env.SECRET_KEY,
		ACCESS_TOKEN_EXPIRES_MIN: process.env.ACCESS_TOKEN_EXPIRES_MIN,
		REFRESH_TOKEN_EXPIRES_MIN: process.env.REFRESH_TOKEN_EXPIRES_MIN,
		NEXT_PUBLIC_LIQPAY_PUBLIC_KEY_TEST:
			process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY_TEST,
		LIQPAY_PRIVATE_KEY_TEST: process.env.LIQPAY_PRIVATE_KEY_TEST,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
	 * This is especially useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
