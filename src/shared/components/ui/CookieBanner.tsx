"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/shared/utils/helpers";

export function CookieBanner() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const hasConsent = window.localStorage.getItem("cookie-consent");
		if (!hasConsent) setIsVisible(true);
	}, []);

	function handleAccept() {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("cookie-consent", "accepted");
		}

		setIsVisible(false);
	}

	if (!isVisible) return null;

	return (
		<div
			className={cn(
				"fixed bottom-4 left-1/2 z-50 -translate-x-1/2",
				"w-full max-w-[40rem] md:mx-auto rounded-lg",
				"bg-slate-800 px-4 py-3 md:px-6 md:py-4 shadow-lg",
			)}
			role="dialog"
			aria-live="polite"
		>
			<div
				className={cn(
					"flex flex-col gap-4 text-sm text-slate-100 md:flex-row md:items-center",
				)}
			>
				<p className="leading-relaxed text-center md:text-left">
					Ми використовуємо лише необхідні cookie, які потрібні для належного
					функціонування вебсайту. Ми не збираємо жодних персональних даних.
					Натискаючи &apos;Прийняти&apos;, ви погоджуєтеся з нашою{" "}
					<Link
						href="/privacy-policy"
						className="underline underline-offset-2 transition-colors hover:text-sky-400"
					>
						політикою конфіденційності
					</Link>
					.
				</p>

				<button
					type="button"
					onClick={handleAccept}
					className={cn(
						"self-center rounded-md bg-sky-500 px-4 py-2",
						"text-sm font-semibold text-white transition-colors",
						"hover:bg-sky-600 focus:outline-none",
						"focus-visible:ring-2 focus-visible:ring-sky-400",
					)}
				>
					Прийняти
				</button>
			</div>
		</div>
	);
}
