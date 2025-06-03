import { memo } from "react";
import Script from "next/script";

import { Button } from "@/shared/components/ui";
import { HttpMethod } from "@/server/core/services/interfaces/IApiService";
import { useAuth } from "@/shared/hooks";

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

	const { userId } = useAuth();

	const handlePay = async () => {
		if (!userId) {
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
	};

	return (
		<>
			<Script src="https://static.liqpay.ua/libjs/checkout.js" strategy="afterInteractive" />
			<Button className="w-full" onClick={handlePay}>
				Оформити
			</Button>
			<div id="liqpay" />
		</>
	);
});
