"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo } from "react";
import {
	Coins as CoinsIcon,
	Sparkles,
	MapPinned,
	CircleUser,
	User,
	ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { Button } from "@/shared/components/ui";
import { useAuth } from "@/shared/hooks";
import { ROUTES } from "@/shared/utils/routes";
import { cn } from "../utils/helpers";

export const Header = memo(() => {
	const pathname = usePathname();
	const { session, isAdmin, isChecking, logout } = useAuth();

	if (isChecking) {
		return null;
	}

	const isSignInPage = pathname === ROUTES.SignIn;
	const authLink = isSignInPage ? ROUTES.SignUp : ROUTES.SignIn;

	const AuthArea = session ? (
		<>
			<RoadmapBtn />
			<UserMenu />
		</>
	) : (
		<Link href={authLink} className="group inline-block">
			<motion.button
				type="button"
				whileTap={{ scale: 0.96 }}
				className={cn(
					"relative inline-flex items-center gap-2 rounded-2xl px-8 py-3 text-base font-semibold text-white",
					"focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
					"before:absolute before:inset-0 before:-z-10 before:rounded-2xl",
					"before:bg-[linear-gradient(130deg,#6366F1_0%,#0EA5E9_50%,#6366F1_100%)]",
					"before:bg-[length:200%_100%] before:transition-[background-position] before:duration-500",
					"hover:before:bg-[position:100%_0]"
				)}
				aria-label={isSignInPage ? "Перейти до реєстрації" : "Перейти до входу"}
			>
				{isSignInPage ? "Реєстрація" : "Вхід"}
				<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
			</motion.button>
		</Link>
	);

	const AdminArea = (
		<div className="flex items-center gap-3">
			<Link href={ROUTES.Admin.Subscriptions.Root}>
				<Button color="white">Підписки</Button>
			</Link>
			<Link href={ROUTES.Admin.Tests.Root}>
				<Button color="white">Тести</Button>
			</Link>
			<Button onClick={logout}>Вийти</Button>
		</div>
	);

	return (
		<header className="fixed inset-x-0 top-0 z-50 h-[70px] border-b border-white/20 bg-white/80 backdrop-blur dark:bg-zinc-900/80">
			<div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
				<Brand />
				<div className="flex items-center gap-4">{isAdmin ? AdminArea : AuthArea}</div>
			</div>
		</header>
	);
});

const UserMenu = () => {
	const { session, logout } = useAuth();

	return (
		<Menu as="div" className="relative">
			<MenuButton
				as="button"
				className="inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-black/5 dark:hover:bg-white/5"
			>
				<CoinsIcon className="h-5 w-5 text-amber-500" />
				<span className="text-sm font-medium">{session?.coins ?? 0}</span>
				<Sparkles className="h-5 w-5 text-indigo-500" />
				<span className="text-sm font-medium">{session?.experience ?? 0}</span>
				<User />
			</MenuButton>

			<MenuItems className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-white shadow-lg dark:bg-zinc-800">
				<MenuItem>
					{({ focus }) => (
						<Link href={ROUTES.Profile}>
							<button
								className={cn("flex w-full items-center gap-2 px-4 py-2 text-sm", {
									"bg-sky-50 dark:bg-zinc-700": focus,
								})}
							>
								<CircleUser className="h-4 w-4" /> Профіль
							</button>
						</Link>
					)}
				</MenuItem>
				<MenuItem>
					{({ focus }) => (
						<button
							className={cn("w-full px-4 py-2 text-left text-sm", {
								"bg-sky-50 dark:bg-zinc-700": focus,
							})}
							onClick={logout}
						>
							Вийти
						</button>
					)}
				</MenuItem>
			</MenuItems>
		</Menu>
	);
};

const Brand = () => {
	return (
		<Link
			href={ROUTES.Home}
			className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight"
		>
			<span className="rounded bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
				Mentor
			</span>
			<span className="text-sky-600 dark:text-indigo-400">AI</span>
		</Link>
	);
};

const RoadmapBtn = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push(ROUTES.Learning.Roadmap);
	};

	return (
		<button
			onClick={handleClick}
			className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2 font-medium text-sky-600 dark:text-indigo-300"
		>
			<motion.span
				initial={{ x: "-100%" }}
				animate={{ x: "100%" }}
				transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
				className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-sky-500/10 to-transparent blur-sm"
			/>
			<MapPinned className="relative z-10 h-5 w-5" />
			<span className="relative z-10">Roadmap</span>
		</button>
	);
};
