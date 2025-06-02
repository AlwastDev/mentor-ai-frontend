"use client";

import { memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "../components/ui";
import { useAuth } from "../hooks";
import { ROUTES } from "../utils/routes";

export const Header = memo(() => {
	const router = useRouter();
	const pathname = usePathname();
	const { session, isAdmin, logout } = useAuth();

	const isSignInPage = pathname === ROUTES.SignIn;

	if (isAdmin) {
		return (
			<header className="h-[70px] flex px-3 items-center gap-x-2 justify-end border-b-2 border-[#E5E5E5]">
				<Link href={ROUTES.Admin.Tests.Root}>
					<Button>Тести</Button>
				</Link>

				<Button onClick={logout}>Вийти</Button>
			</header>
		);
	}

	return (
		<header className="h-[70px] flex px-3 items-center gap-x-2 justify-end border-b-2 border-[#E5E5E5]">
			{session ? (
				<Button onClick={logout}>Вийти</Button>
			) : (
				<Button
					color="white"
					onClick={() => router.push(isSignInPage ? ROUTES.SignUp : ROUTES.SignIn)}
				>
					{isSignInPage ? "Реєстрація" : "Вхід"}
				</Button>
			)}
		</header>
	);
});
