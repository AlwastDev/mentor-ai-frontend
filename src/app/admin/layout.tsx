"use client";
import { useProtectedPage } from "@/shared/hooks";
import { UserRole } from "@/shared/utils/enums";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const isAllowed = useProtectedPage({ requiredRole: UserRole.ADMIN });

	if (!isAllowed) {
		return;
	}

	return <>{children}</>;
}