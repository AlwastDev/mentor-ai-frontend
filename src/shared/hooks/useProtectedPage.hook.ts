"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

	const { isChecking } = useAuth();
	const router = useRouter();

	const [isAllowed, setIsAllowed] = useState(false);

	useEffect(() => {
		if (isChecking) {
			return;
		}

		(async () => {
			try {
				const user = (await fetchMe()) as SessionUser;

				if (!user) {
					router.push(ROUTES.SignIn);
				}

				if (requiredRole && user.role !== requiredRole) {
					router.push(ROUTES.Home);
				}

				setIsAllowed(true);
			} catch (err) {
				console.error("JWT verification failed", err);
				router.push(ROUTES.SignIn);
			}
		})();
	}, [router, isChecking, requiredRole]);

	return isAllowed;
};
