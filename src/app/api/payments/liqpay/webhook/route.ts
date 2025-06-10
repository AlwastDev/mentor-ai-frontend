import { type NextRequest } from "next/server";

import { liqpaySign } from "@/shared/utils/liqpay";
import { env } from "@/env.mjs";
import { SYMBOLS } from "@/server/constants/symbols";
import type { IStudentSubscriptionService } from "@/server/core/services/interfaces/IStudentSubscriptionService";
import { container } from "@/server/inversify.config";

const PRIV = env.LIQPAY_PRIVATE_KEY_TEST!;

const studentSubscriptionService = container.get<IStudentSubscriptionService>(
	SYMBOLS.IStudentSubscriptionService,
);

export async function POST(req: NextRequest) {
	const raw = await req.text();
	const params = new URLSearchParams(raw);
	const data = params.get("data");
	const signature = params.get("signature");

	if (!data || !signature) {
		return new Response("Missing data or signature", { status: 400 });
	}

	const valid = liqpaySign(data, PRIV) === signature;
	if (!valid) return new Response("invalid signature", { status: 400 });

	const body = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

	if (
		(env.NODE_ENV === "development" && body.status === "sandbox") ||
		body.status === "success"
	) {
		await studentSubscriptionService.add({
			data,
			signature,
		});
	}

	return new Response("OK");
}
