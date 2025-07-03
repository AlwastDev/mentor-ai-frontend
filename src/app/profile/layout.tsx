"use client";

import { cn } from "@/shared/utils/helpers";
import { RightSideNav } from "../../features/profile/components/RightSideNav";
import { useProtectedPage } from "@/shared/hooks";
import { UserRole } from "@/shared/utils/enums";
import { Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/shared/utils/routes";

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isAllowed = useProtectedPage({ requiredRole: UserRole.STUDENT });
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	if (!isAllowed) {
		return null;
	}

	return (
		<>
			<div className={cn("container mx-auto max-w-6xl px-4 py-10")}>
				<div className={cn("flex flex-row-reverse gap-10")}>
					<RightSideNav />
					<div className="flex-1">{children}</div>
				</div>

				{/* Mobile menu button */}
				<button
					onClick={() => setIsMenuOpen(true)}
					className="lg:hidden fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
					aria-label="Відкрити меню"
				>
					<MenuIcon className="h-6 w-6" />
				</button>
			</div>

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
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "tween", duration: 0.3 }}
							className="fixed right-0 top-0 z-50 h-screen w-72 overflow-y-auto bg-white p-6 lg:hidden"
						>
							<button
								onClick={() => setIsMenuOpen(false)}
								className="absolute left-4 top-4 text-gray-500"
								aria-label="Закрити меню"
							>
								<X className="h-6 w-6" />
							</button>

							<nav className="mt-8 space-y-1">
								<Link
									href={ROUTES.Profile}
									onClick={() => setIsMenuOpen(false)}
									className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
								>
									Профіль
								</Link>
								<Link
									href={ROUTES.ChangePassword}
									onClick={() => setIsMenuOpen(false)}
									className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
								>
									Змінити пароль
								</Link>
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
