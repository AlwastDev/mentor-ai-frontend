"use client";

import { useProtectedPage } from "@/shared/hooks";
import { UserRole } from "@/shared/utils/enums";

export default function LearningLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useProtectedPage({ requiredRole: UserRole.STUDENT });

	return <>{children}</>;
}
