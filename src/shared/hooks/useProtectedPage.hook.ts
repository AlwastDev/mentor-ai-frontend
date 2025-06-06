"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { type UserRole } from "@/shared/utils/enums";
import { ROUTES } from "../utils/routes";
import { type SessionUser } from "../utils/types";
import { useAuth } from "./useAuth.hook";

const fetchMe = async () => {
	const res = await fetch(`/api/auth/me`);
	if (!res.ok) throw new Error("Unauthorized");
	return res.json();
};

type ProtectedPageOptions = {
	requiredRole?: UserRole;
};

export const useProtectedPage = (options?: ProtectedPageOptions) => {
	const { requiredRole } = options || {};

	const { isAuthed, isChecking } = useAuth();

	const [isAllowed, setIsAllowed] = useState(false);

	useEffect(() => {
		if (isChecking || !isAuthed) {
			return;
		}

		(async () => {
			try {
				const user = (await fetchMe()) as SessionUser;

				if (!user) {
					redirect(ROUTES.SignIn);
				}

				if (requiredRole && user.role !== requiredRole) {
					redirect(ROUTES.Home);
				}

				setIsAllowed(true);
			} catch (err) {
				console.error("JWT verification failed", err);
				redirect(ROUTES.SignIn);
			}
		})();
	}, []);

	return isAllowed;
};
