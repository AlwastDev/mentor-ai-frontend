"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { UserRole } from "../utils/enums";
import { ROUTES } from "../utils/routes";
import { type SessionUser } from "../utils/types";

const fetchMe = async () => {
	const res = await fetch("/api/auth/me");
	if (res.status === 401) return null;
	if (!res.ok) throw new Error("Unauthorized");
	return res.json();
};

export const useAuth = () => {
	const router = useRouter();

	const {
		data: session,
		isLoading,
		refetch,
	} = useQuery<SessionUser>({
		queryKey: ["auth.me"],
		queryFn: fetchMe,
		retry: 1,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	const logout = useCallback(async () => {
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			refetch();
			router.push(ROUTES.SignIn);
		} catch (err) {
			console.error("Logout failed", err);
		}
	}, [refetch, router]);

	const deleteAccount = useCallback(async () => {
		try {
			await fetch("/api/auth/delete-account", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			refetch();
			router.push(ROUTES.SignIn);
		} catch (err) {
			console.error("Delete account failed", err);
		}
	}, [refetch, router]);

	const userId = session?.id ?? "";
	const role = session?.role ?? UserRole.STUDENT;

	const isStudent = role === UserRole.STUDENT;
	const isAdmin = role === UserRole.ADMIN;
	const isAuthed = !!session;
	const isChecking = isLoading && session === undefined;

	return {
		session,
		role,
		userId,
		isChecking,
		isStudent,
		isAdmin,
		isAuthed,
		status: (() => {
			if (isLoading) return "loading"
			if (isAuthed) return "authenticated"
			return "unauthenticated"
		})(),
		logout,
		deleteAccount,
		refetch,
	};
};
