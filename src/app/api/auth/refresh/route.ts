import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { SYMBOLS } from "@/server/constants/symbols";
import type { IAuthService } from "@/server/core/services/interfaces/IAuthService";
import { container } from "@/server/inversify.config";
import { env } from "@/env.mjs";

const authService = container.get<IAuthService>(SYMBOLS.IAuthService);

export async function POST() {
	const cookiesStore = await cookies();
	const refreshToken = cookiesStore.get("refresh_token")?.value;

	if (!refreshToken) {
		return unauthorizedResponse();
	}

	try {
		const { accessToken } = await authService.refreshToken(refreshToken);

		cookiesStore.set("access_token", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: env.ACCESS_TOKEN_EXPIRES_MIN * 60,
			path: "/",
		});

		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.log(error);
		// if refresh token is invalid or expired
		return unauthorizedResponse();
	}
}

function unauthorizedResponse() {
	const response = new NextResponse("Unauthorized", { status: 401 });

	// clear both tokens
	response.cookies.set("access_token", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/",
	});

	response.cookies.set("refresh_token", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/",
	});

	return response;
}