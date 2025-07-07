import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { computeHmac } from "@/shared/utils/helpers";
import { SignUpMethod } from "@/shared/utils/enums";

export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get("code");
	if (!code) return NextResponse.redirect(new URL("/auth/error", req.url));

	try {
		console.log(`${env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`);
		// 1. Get access_token from Google
		const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				code,
				client_id: env.GOOGLE_CLIENT_ID,
				client_secret: env.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`,
				grant_type: "authorization_code",
			}),
		});
		const tokenData = await tokenRes.json();
		const { access_token } = tokenData;

		// 2. Get email from profile
		const profileRes = await fetch(
			"https://www.googleapis.com/oauth2/v3/userinfo",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			},
		);
		const profile = await profileRes.json();
		const email = profile?.email;
		const name = profile?.given_name;
		const surname = profile?.family_name;
		if (!email) throw new Error("Email not found in profile");

		// 3. Call backend: /auth/sign-in-by-service
		const signature = computeHmac(
			`${email}:${SignUpMethod.GOOGLE}`,
			env.SERVICE_SIGNIN_SECRET,
		);

		const loginRes = await fetch(`${env.BACKEND_URL}/auth/sign-in-by-service`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				signUpMethod: SignUpMethod.GOOGLE,
				signature,
				name,
				surname,
			}),
		});

		if (!loginRes.ok) {
			console.error("❌ sign-in-by-service failed:", await loginRes.text());
			return NextResponse.redirect(new URL("/auth/error", req.url));
		}

		const { accessToken, refreshToken } = await loginRes.json();

		// 4. Save tokens to HttpOnly cookie
		const response = NextResponse.redirect(`${env.NEXT_PUBLIC_SITE_URL}/`);
		response.cookies.set("access_token", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: env.ACCESS_TOKEN_EXPIRES_MIN * 60,
			path: "/",
		});
		response.cookies.set("refresh_token", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: env.REFRESH_TOKEN_EXPIRES_MIN * 60,
			path: "/",
		});

		return response;
	} catch (e) {
		console.error("Google OAuth error:", e);
		return NextResponse.redirect(new URL("/auth/error", req.url));
	}
}
