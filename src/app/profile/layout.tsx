"use client";

import { cn } from "@/shared/utils/helpers";
import { RightSideNav } from "../../features/profile/components/RightSideNav";
import { useProtectedPage } from "@/shared/hooks";
import { UserRole } from "@/shared/utils/enums";

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isAllowed = useProtectedPage({ requiredRole: UserRole.STUDENT });

	if (!isAllowed) {
		return null;
	}

	return (
		<div className={cn("container mx-auto max-w-6xl px-4 py-10")}>
			<div className={cn("flex flex-row-reverse gap-10")}>
				<RightSideNav />
				<div className="flex-1">{children}</div>
			</div>
		</div>
	);
}
