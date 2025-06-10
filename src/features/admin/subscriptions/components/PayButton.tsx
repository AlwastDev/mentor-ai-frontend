import { memo, useCallback } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/components/ui";
import { HttpMethod } from "@/server/core/services/interfaces/IApiService";
import { useAuth, useNotification } from "@/shared/hooks";
import { ROUTES } from "@/shared/utils/routes";

type PayButtonProps = {
	plan: {
		id: string;
		planName: string;
		price: number;
	};
};

const API_URL = "/api/payments/liqpay/create";

export const PayButton = memo((props: PayButtonProps) => {
	const { plan } = props;

	const router = useRouter();
	const n = useNotification();
	const { userId, isAdmin } = useAuth();

	const handlePay = useCallback(async () => {
		if (!userId) {
			router.push(ROUTES.SignIn);
			return;
		}

		if (isAdmin) {
			n.error("Адміністратор не може оплачувати підписку");
			return;
		}

		const res = await fetch(API_URL, {
			method: HttpMethod.POST,
			body: JSON.stringify({ plan, userId }),
		});
		const { data, signature } = await res.json();

		// @ts-ignore
		LiqPayCheckout.init({
			data,
			signature,
			embedTo: "#liqpay",
			mode: "popup",
			language: "uk",
		})
			.on("liqpay.callback", (d: any) => console.log("status:", d.status))
			.on("liqpay.close", () => console.log("close"));
	}, [userId, isAdmin, plan, router, n]);

	return (
		<>
			<Script
				src="https://static.liqpay.ua/libjs/checkout.js"
				strategy="afterInteractive"
			/>
			<Button className="w-full" onClick={handlePay}>
				Оформити
			</Button>
			<div id="liqpay" />
		</>
	);
});
