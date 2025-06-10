import { type NextRequest, NextResponse } from "next/server";

import { SYMBOLS } from "@/server/constants/symbols";
import { type IAuthService } from "@/server/core/services/interfaces/IAuthService";
import { container } from "@/server/inversify.config";
import { env } from "@/env.mjs";

const authService = container.get<IAuthService>(SYMBOLS.IAuthService);

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();
		const { accessToken, refreshToken } = await authService.login({
			email,
			password,
		});

		const response = NextResponse.json({ accessToken, refreshToken });

		response.cookies.set("access_token", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: env.ACCESS_TOKEN_EXPIRES_MIN * 60,
			path: "/",
		});
		response.cookies.set("refresh_token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: env.REFRESH_TOKEN_EXPIRES_MIN * 60,
			path: "/",
		});

		return response;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ message }, { status: 401 }); // або 400
	}
}
