"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route, Trophy } from "lucide-react";

import { useProtectedPage } from "@/shared/hooks";
import { UserRole } from "@/shared/utils/enums";
import { ROUTES } from "@/shared/utils/routes";
import { cn } from "@/shared/utils/helpers";
import { XPProgressCard } from "@/features/roadmap/components";

export default function LearningLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isAllowed = useProtectedPage({ requiredRole: UserRole.STUDENT });

	if (!isAllowed) {
		return null;
	}

	return (
		<div className="container relative mx-auto flex gap-12 pt-12">
			<LeftSidebar />
			{children}
			<RightSidebar />
		</div>
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
		<aside className="fixed left-16 top-12 h-screen w-56 shrink-0 border-r border-gray-200 bg-white p-6">
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
	);
}

function RightSidebar() {
	return (
		<aside className="fixed right-16 top-12 h-screen w-[380px] shrink-0 border-l border-gray-200 bg-white p-6">
			<XPProgressCard
				currentXP={100}
				maxTests={10}
				weekly={[
					{ day: "Monday", xp: 1 },
					{ day: "Tuesday", xp: 10 },
					{ day: "Wednesday", xp: 50 },
					{ day: "Thursday", xp: 30 },
					{ day: "Friday", xp: 20 },
					{ day: "Saturday", xp: 70 },
					{ day: "Sunday", xp: 90 },
				]}
			/>
		</aside>
	);
}
