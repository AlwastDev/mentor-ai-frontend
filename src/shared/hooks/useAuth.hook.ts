import { useCallback } from "react";
import { signOut, useSession } from "next-auth/react";

import { UserRole } from "../utils/enums";
import { ROUTES } from "../utils/routes";

export const useAuth = () => {
	const { status, data: session } = useSession();

	const logout = useCallback(async () => {
		void signOut({ redirect: true, callbackUrl: ROUTES.Home });
	}, []);

	const userId = session?.user.id ?? "";

	const role = session?.user?.role ?? UserRole.STUDENT;

	const isUser = session?.user.role === UserRole.STUDENT;
	const isAdmin = session?.user.role === UserRole.ADMIN;
	const isAuthed = !!session;

	return {
		session,
		role,
		userId,
		status,
		isUser,
		isAdmin,
		isAuthed,
		logout,
	};
};
