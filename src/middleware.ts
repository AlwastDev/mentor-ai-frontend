import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { UserRole } from "@/shared/utils/enums";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });

	if (!token) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	if (request.nextUrl.pathname.startsWith("/admin")) {
		if (token.user?.role !== UserRole.ADMIN) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin", "/admin/:path*"],
};
