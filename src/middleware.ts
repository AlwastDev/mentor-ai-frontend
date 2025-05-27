import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

import { UserRole } from "@/shared/utils/enums";
import { env } from "./env.mjs";

export const config = {
	matcher: ["/admin", "/admin/:path*"],
};

const secret = new TextEncoder().encode(env.SECRET_KEY);

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("access_token")?.value;

	if (!token) {
		return;
	}

	try {
		const { payload } = await jwtVerify(token, secret);

		const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as UserRole;

		if (request.nextUrl.pathname.startsWith("/admin")) {
			if (role !== UserRole.ADMIN) {
				return NextResponse.redirect(new URL("/", request.url));
			}
		}

		return NextResponse.next();
	} catch (err) {
		console.error("Invalid JWT:", err);
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}
}

