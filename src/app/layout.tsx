import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import parser from "ua-parser-js";

import { ModalRoot } from "@/shared/layouts/Modal/ModalRoot";
import { CookieBanner } from "@/shared/components/ui";
import { Header } from "@/shared/layouts/Header";
import Providers from "./providers";

import "../styles/globals.css";

const inter = Inter({
	variable: "--font-inter",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "MentorAI",
	description: "MentorAI",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersList = await headers();
	const userAgent = headersList.get("user-agent") || "";
	const deviceType = parser(userAgent).device.type || "desktop";

	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased`}>
				<Providers deviceType={deviceType}>
					<ModalRoot />
					<CookieBanner />
					<Header />
					<main className="mt-[70px]">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
