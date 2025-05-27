"use client";
import { useCallback } from "react";

import { Button, Icon } from "@/shared/components/ui";

export const GoogleButton = () => {
	const handleGoogleLogin = useCallback(() => {
		window.location.href = "/api/auth/google";
	}, []);

	return (
		<Button color="white" className="w-full gap-x-3" onClick={handleGoogleLogin}>
			<Icon className="size-fit" icon="google" />
			<p className="text-xs font-bold text-[#4285F4] uppercase tracking-[0.8px]">Google</p>
		</Button>
	);
};
