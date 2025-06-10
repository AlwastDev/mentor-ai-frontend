import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SYMBOLS } from "@/server/constants/symbols";
import { type IAuthService } from "@/server/core/services/interfaces/IAuthService";
import { container } from "@/server/inversify.config";

const authService = container.get<IAuthService>(SYMBOLS.IAuthService);

export async function POST() {
	const cookiesStore = await cookies();
	const accessToken = cookiesStore.get("access_token")?.value;

	if (!accessToken) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	await authService.logout(accessToken);

	const response = new NextResponse("Success", { status: 200 });

	response.cookies.set("access_token", "", {
		httpOnly: true,
		path: "/",
		expires: new Date(0),
	});

	response.cookies.set("refresh_token", "", {
		httpOnly: true,
		path: "/",
		expires: new Date(0),
	});

	return response;
}
