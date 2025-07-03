"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route, Trophy, Menu as MenuIcon, X } from "lucide-react";

import { useProtectedPage } from "@/shared/hooks";
import { UserRole } from "@/shared/utils/enums";
import { ROUTES } from "@/shared/utils/routes";
import { cn } from "@/shared/utils/helpers";
import { XPProgressCard } from "@/features/roadmap/components";
import { motion, AnimatePresence } from "framer-motion";

export default function LearningLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isAllowed = useProtectedPage({ requiredRole: UserRole.STUDENT });

	const isTestPage = useMemo(() => {
		return pathname.includes(ROUTES.Learning.TestAttempt(""));
	}, [pathname]);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	if (!isAllowed) {
		return null;
	}

	return (
		<>
			<div className="container relative mx-auto flex gap-12 pt-12">
				{!isTestPage && <LeftSidebar />}
				{children}
				{!isTestPage && <RightSidebar />}
			</div>

			{/* Mobile menu button */}
			{!isTestPage && (
				<button
					onClick={() => setIsMenuOpen(true)}
					className="fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg lg:hidden"
					aria-label="Відкрити меню"
				>
					<MenuIcon className="h-6 w-6" />
				</button>
			)}

			{/* Mobile side menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<>
						{/* Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-40 bg-black"
							onClick={() => setIsMenuOpen(false)}
						/>

						{/* Drawer */}
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

							<nav className="mt-8 space-y-1">
								{navItems.map(({ label, href, icon }) => (
									<Link
										key={href}
										href={href}
										className={cn(
											"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
											"hover:bg-blue-50 hover:text-blue-600",
											href === pathname ? "bg-blue-100 text-blue-700" : "text-gray-700",
										)}
										onClick={() => setIsMenuOpen(false)}
									>
										{icon}
										<span>{label}</span>
									</Link>
								))}
							</nav>

							<div className="mt-8">
								<XPProgressCard />
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}

type NavItem = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

const navItems: NavItem[] = [
	{
		label: "Мапа",
		href: ROUTES.Learning.Roadmap,
		icon: <Route className="h-5 w-5 shrink-0" />,
	},
	{
		label: "Таблиця лідерів",
		href: ROUTES.Learning.Leaderboard,
		icon: <Trophy className="h-5 w-5 shrink-0" />,
	},
];

function LeftSidebar() {
	const pathname = usePathname();

	return (
		<div className="hidden lg:block w-56 shrink-0">
			<aside className="fixed left-16 top-12 h-screen w-56 border-r border-gray-200 bg-white p-6">
				<nav className="space-y-1">
					{navItems.map(({ label, href, icon }) => {
						const active = pathname.startsWith(href);
						return (
							<Link
								key={href}
								href={href}
								className={cn(
									"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
									"hover:bg-blue-50 hover:text-blue-600",
									active
										? "bg-blue-100 text-blue-700"
										: "text-gray-700",
								)}
							>
								{icon}
								<span>{label}</span>
							</Link>
						);
					})}
				</nav>
			</aside>
		</div>
	);
}

function RightSidebar() {
	return (
		<div className="hidden lg:block w-[380px] shrink-0">
			<aside className="fixed right-16 top-12 h-screen w-[380px] border-l border-gray-200 bg-white p-6">
				<XPProgressCard />
			</aside>
		</div>
	);
}
