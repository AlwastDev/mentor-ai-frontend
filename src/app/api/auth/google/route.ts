import { NextResponse } from "next/server";

import { env } from "@/env.mjs";

export async function GET() {
	const params = new URLSearchParams({
		client_id: env.GOOGLE_CLIENT_ID,
		redirect_uri: `${env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`,
		response_type: "code",
		scope: "openid email profile",
		access_type: "offline",
		prompt: "consent",
	});

	return NextResponse.redirect(
		`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
	);
}
