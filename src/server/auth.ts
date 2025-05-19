import { type NextAuthOptions } from "next-auth";
import { type JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { signInInputSchema } from "@/features/sign-in/schemas/signIn.schema";
import { signUpInputSchema } from "@/features/sign-up/schemas/signUp.schema";
import { defineBackendUrl } from "@/app/api/defineBackendUrl";
import { type SessionUser } from "@/shared/utils/types";
import { SignUpMethod } from "@/shared/utils/enums";
import { computeHmac } from "@/shared/utils/helpers";
import { signOut } from "next-auth/react";
import { ROUTES } from "@/shared/utils/routes";

declare module "next-auth" {
	interface Session {
		user: SessionUser;
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: SessionUser;
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
	}
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		const backend = await defineBackendUrl();
		const res = await fetch(`${backend}/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: token.refreshToken }),
		});

		if (res.status === 401) {
			await signOut({ redirect: true, callbackUrl: ROUTES.SignIn });
			throw new Error("Refresh token expired or unauthorized");
		}

		if (!res.ok) throw new Error("Refresh failed");

		const data = await res.json();
		return {
			...token,
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
			accessTokenExpires: Date.now() + env.ACCESS_TOKEN_EXPIRES_MIN * 60 * 1000,
		};
	} catch (err) {
		console.error("❌ Error refreshing token:", err);
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export const authOptions: NextAuthOptions = {
	session: { strategy: "database" },
	secret: env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/auth/sign-in",
		signOut: "/auth/sign-out",
		error: "/auth/error",
	},
	providers: [
		Credentials({
			id: "sign-in",
			name: "sign-in",
			credentials: {
				email: { label: "E-mail", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(raw) {
				const { email, password } = signInInputSchema.parse(raw);
				const backend = await defineBackendUrl();
				const r = await fetch(`${backend}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				});
				if (!r.ok) throw new Error((await r.json()).message);
				const response = (await r.json()) as SessionUser;
				return {
					...response,
					accessTokenExpires: Date.now() + env.ACCESS_TOKEN_EXPIRES_MIN * 60 * 1000,
				};
			},
		}),
		Credentials({
			id: "sign-up",
			name: "sign-up",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
				name: { label: "name", type: "text" },
				surname: { label: "surname", type: "text" },
			},
			async authorize(raw) {
				const { email, password, name, surname } = signUpInputSchema.parse(raw);
				const backend = await defineBackendUrl();
				const r = await fetch(`${backend}/auth/register`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password, name, surname }),
				});
				if (!r.ok) throw new Error((await r.json()).message);
				const response = (await r.json()) as SessionUser;
				return {
					...response,
					accessTokenExpires: Date.now() + env.ACCESS_TOKEN_EXPIRES_MIN * 60 * 1000,
				};
			},
		}),
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		async jwt({ token, user }): Promise<JWT> {
			console.log(token.accessTokenExpires)
			if (Date.now() >= token.accessTokenExpires) {
				console.log("🔄 Refreshing access token...");
				return await refreshAccessToken(token as JWT);
			}
		
			// 🔄 only if it's a login, not a refresh
			if (user) {
				const sessionUser = user as SessionUser & {
					accessToken: string;
					refreshToken: string;
					accessTokenExpires: number;
				};
		
				return {
					...token,
					user: {
						id: sessionUser.id,
						email: sessionUser.email,
						name: sessionUser.name,
						surname: sessionUser.surname,
						role: sessionUser.role,
					},
					accessToken: sessionUser.accessToken,
					refreshToken: sessionUser.refreshToken,
					accessTokenExpires: sessionUser.accessTokenExpires,
				};
			}
		
			// ✅ no changes
			return token;
		},
		session({ session, token }) {
			session.user = token.user;
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			session.accessTokenExpires = token.accessTokenExpires;
			return session;
		},
		async signIn({ user, account, profile }) {
			if (account?.provider !== "google") return true;
			if (!profile?.email) throw new Error("No email in Google profile");

			const backend = await defineBackendUrl();
			const signature = computeHmac(
				`${profile.email}:${SignUpMethod.GOOGLE}`,
				env.SERVICE_SIGNIN_SECRET,
			);

			const r = await fetch(`${backend}/auth/sign-in-by-service`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: profile.email,
					signUpMethod: SignUpMethod.GOOGLE,
					signature,
				}),
			});
			if (!r.ok) {
				console.error("❌ Google sign-in backend error:", await r.text());
				throw new Error("Backend error");
			}
			const response = await r.json();

			Object.assign(user, {
				...response,
				accessTokenExpires: Date.now() + env.ACCESS_TOKEN_EXPIRES_MIN * 60 * 1000,
			});
			return true;
		},
	},
};
