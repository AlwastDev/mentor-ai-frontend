import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { IAuthService } from "@/server/core/services/interfaces/IAuthService";
import { env } from "@/env.mjs";

const authService = container.get<IAuthService>(SYMBOLS.IAuthService);

export async function GET() {
	const cookiesStore = await cookies();
	let accessToken = cookiesStore.get("access_token")?.value;
	const refreshToken = cookiesStore.get("refresh_token")?.value;

	if (!accessToken && refreshToken) {
		try {
			const { accessToken: newAccessToken } =
				await authService.refreshToken(refreshToken);

			cookiesStore.set("access_token", newAccessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: env.ACCESS_TOKEN_EXPIRES_MIN * 60,
				path: "/",
			});

			accessToken = newAccessToken;
		} catch (e) {
			console.error("Refresh token invalid or expired", e);
			return new NextResponse("Unauthorized", { status: 401 });
		}
	}

	if (!accessToken) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	try {
		const user = await authService.me(accessToken);
		return NextResponse.json(user);
	} catch (error) {
		console.error("Error fetching user", error);
		return new NextResponse("Unauthorized", { status: 401 });
	}
}
