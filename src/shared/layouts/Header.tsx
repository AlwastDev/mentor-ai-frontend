"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useState } from "react";
import {
	Coins as CoinsIcon,
	Sparkles,
	MapPinned,
	CircleUser,
	User,
	ArrowRight,
	Menu as MenuIcon,
	X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { Button } from "@/shared/components/ui";
import { useAuth } from "@/shared/hooks";
import { ROUTES } from "@/shared/utils/routes";
import { cn } from "../utils/helpers";

export const Header = memo(() => {
	const pathname = usePathname();
	const { session, isAdmin, isChecking, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
					"hover:before:bg-[position:100%_0]",
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
			<Link href={ROUTES.Learning.Leaderboard}>
				<Button color="white">Лідерборд</Button>
			</Link>
			<Link href={ROUTES.Admin.Subscriptions.Root}>
				<Button color="white">Підписки</Button>
			</Link>
			<Link href={ROUTES.Admin.Tests.Root}>
				<Button color="white">Тести</Button>
			</Link>
			<Button onClick={logout}>Вийти</Button>
		</div>
	);

	if (isChecking) {
		return null;
	}

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-50 h-[70px] border-b border-white/20 bg-white/80 backdrop-blur">
				<div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
					<Brand />
					<div className="flex items-center gap-4">
						{/* Desktop actions */}
						<div className="hidden items-center gap-4 lg:flex">
							{isAdmin ? AdminArea : AuthArea}
						</div>

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMenuOpen(true)}
							className="rounded-md p-2 transition hover:bg-black/10 lg:hidden"
							aria-label="Відкрити меню"
						>
							<MenuIcon className="h-6 w-6" />
						</button>
					</div>
				</div>
			</header>

			{/* Mobile drawer */}
			<AnimatePresence>
				{isMenuOpen && (
					<>
						{/* overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-40 bg-black"
							onClick={() => setIsMenuOpen(false)}
						/>

						{/* drawer */}
						<motion.aside
							initial={{ x: "-100%" }}
							animate={{ x: 0 }}
							exit={{ x: "-100%" }}
							transition={{ type: "tween", duration: 0.3 }}
							className="fixed left-0 top-0 z-50 h-screen w-72 overflow-y-auto bg-white p-6 lg:hidden"
						>
							<button
								onClick={() => setIsMenuOpen(false)}
								className="absolute right-4 top-4 text-gray-500"
								aria-label="Закрити меню"
							>
								<X className="h-6 w-6" />
							</button>

							{session && (
								<div className="mb-6 flex items-center gap-3">
									<CoinsIcon className="h-5 w-5 text-amber-500" />
									<span className="text-sm font-medium">
										{session.coins ?? 0}
									</span>
									<Sparkles className="h-5 w-5 text-indigo-500" />
									<span className="text-sm font-medium">
										{session.experience ?? 0}
									</span>
								</div>
							)}
							<nav className="mt-8 space-y-1">
								{isAdmin && (
									<>
										<Link
											href={ROUTES.Learning.Leaderboard}
											onClick={() => setIsMenuOpen(false)}
											className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
										>
											Лідерборд
										</Link>
										<Link
											href={ROUTES.Admin.Subscriptions.Root}
											onClick={() => setIsMenuOpen(false)}
											className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
										>
											Підписки
										</Link>
										<Link
											href={ROUTES.Admin.Tests.Root}
											onClick={() => setIsMenuOpen(false)}
											className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
										>
											Тести
										</Link>
									</>
								)}

								{/* Student */}
								{!isAdmin && session && (
									<>
										<Link
											href={ROUTES.Learning.Roadmap}
											onClick={() => setIsMenuOpen(false)}
											className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
										>
											Мапа
										</Link>
										<Link
											href={ROUTES.Profile}
											onClick={() => setIsMenuOpen(false)}
											className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
										>
											Профіль
										</Link>
									</>
								)}

								{session ? (
									<button
										onClick={() => {
											logout();
											setIsMenuOpen(false);
										}}
										className="mt-4 block w-full rounded-lg bg-red-500 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-red-600"
									>
										Вийти
									</button>
								) : (
									<Link
										href={authLink}
										onClick={() => setIsMenuOpen(false)}
										className="mt-4 block w-full rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
									>
										{isSignInPage ? "Реєстрація" : "Вхід"}
									</Link>
								)}
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
});

const UserMenu = () => {
	const { session, logout } = useAuth();

	return (
		<Menu as="div" className="relative">
			<MenuButton
				as="button"
				className="inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-black/5"
			>
				<CoinsIcon className="h-5 w-5 text-amber-500" />
				<span className="text-sm font-medium">{session?.coins ?? 0}</span>
				<Sparkles className="h-5 w-5 text-indigo-500" />
				<span className="text-sm font-medium">{session?.experience ?? 0}</span>
				<User />
			</MenuButton>

			<MenuItems className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-white shadow-lg">
				<MenuItem>
					{({ focus }) => (
						<Link href={ROUTES.Profile}>
							<button
								className={cn(
									"flex w-full items-center gap-2 px-4 py-2 text-sm",
									{
										"bg-sky-50": focus,
									},
								)}
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
								"bg-sky-50": focus,
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
			className="font-display inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight"
		>
			<span className="rounded bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
				Mentor
			</span>
			<span className="text-sky-600">AI</span>
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
			className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2 font-medium text-sky-600"
		>
			<motion.span
				initial={{ x: "-100%" }}
				animate={{ x: "100%" }}
				transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
				className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-sky-500/10 to-transparent blur-sm"
			/>
			<MapPinned className="relative z-10 h-5 w-5" />
			<span className="relative z-10">Мапа</span>
		</button>
	);
};
