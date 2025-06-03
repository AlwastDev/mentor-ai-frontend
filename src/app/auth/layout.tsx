"use client";
import { redirect } from "next/navigation";

import { useAuth } from "@/shared/hooks";
import { ROUTES } from "@/shared/utils/routes";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const { isAuthed } = useAuth();

	if (isAuthed) {
		return redirect(ROUTES.Home);
	}

	return <>{children}</>;
}