import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { UserRole } from "../utils/enums";
import { ROUTES } from "../utils/routes";

const fetchMe = async () => {
	const res = await fetch("/api/auth/me");
	if (!res.ok) throw new Error("Unauthorized");
	return res.json();
};

export const useAuth = () => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const {
		data: session,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["auth.me"],
		queryFn: fetchMe,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: false,
	});

	const logout = useCallback(async () => {
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
			});
			await queryClient.invalidateQueries({ queryKey: ["auth.me"] });
			router.push(ROUTES.SignIn);
		} catch (err) {
			console.error("Logout failed", err);
		}
	}, [router]);

	const userId = session?.id ?? "";
	const role = session?.role ?? UserRole.STUDENT;

	const isUser = role === UserRole.STUDENT;
	const isAdmin = role === UserRole.ADMIN;
	const isAuthed = !!session;

	return {
		session,
		role,
		userId,
		isUser,
		isAdmin,
		isAuthed,
		status: isLoading ? "loading" : isAuthed ? "authenticated" : "unauthenticated",
		logout,
		refetch,
	};
};
