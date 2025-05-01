"use client";
import { useCallback } from "react";
import { signIn } from "next-auth/react";

import { Button, Icon } from "@/shared/components/ui";

export const GoogleButton = () => {
  const handleGoogleLogin = useCallback(() => {
    signIn("google", {
      redirect: false,
      callbackUrl: "/",
    })
      .then((response) => {
        console.log("result", response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Button color="white" className="w-full gap-x-3" onClick={handleGoogleLogin}>
      <Icon className="size-fit" icon="google" />
      <p className="text-xs font-bold text-[#4285F4] uppercase tracking-[0.8px]">Google</p>
    </Button>
  );
};