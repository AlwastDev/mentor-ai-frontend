"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/utils/helpers"
import { ROUTES } from "@/shared/utils/routes"

const navItems = [
	{ href: ROUTES.Profile, label: "Профіль" },
	{ href: ROUTES.ChangePassword, label: "Змінити пароль" },
]

export function RightSideNav() {
	const pathname = usePathname()

	return (
		<nav className="w-56 flex-shrink-0 border border-gray-200 rounded-xl h-fit p-2">
			<ul className="space-y-2">
				{navItems.map((item) => {
					const isActive = pathname === item.href
					return (
						<li key={item.href}>
							<Link
								href={item.href}
								className={cn(
									"block rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
									isActive
										? "bg-sky-100 text-sky-700"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
								)}
							>
								{item.label}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
} 