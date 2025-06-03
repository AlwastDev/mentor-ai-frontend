import { type NextRequest, NextResponse } from "next/server";

import { liqpaySign } from "@/shared/utils/liqpay";
import { env } from "@/env.mjs";

const PUB = env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY_TEST!;
const PRIV = env.LIQPAY_PRIVATE_KEY_TEST!;

export async function POST(req: NextRequest) {
	const { plan, userId } = await req.json();

	const params = {
		public_key: PUB,
		version: "3",
		action: "pay",
		amount: plan.price,
		currency: "UAH",
		description: `Підписка ${plan.planName}`,
		order_id: `sub_${plan.id}_${userId}_${Date.now()}`,
		server_url: `${env.NEXT_PUBLIC_SITE_URL}/api/payments/liqpay/webhook`,
		// result_url: `${env.NEXT_PUBLIC_SITE_URL}/subscriptions/success`,
		sandbox: 1,
	};

	const dataB64 = Buffer.from(JSON.stringify(params)).toString("base64");
	const signature = liqpaySign(dataB64, PRIV);

	return NextResponse.json({ data: dataB64, signature });
}
