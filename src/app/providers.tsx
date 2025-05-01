"use client"
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { SnackbarProvider } from "notistack";

import { TRPCProvider } from "@/providers/TRPCProvider";
import { DeviceTypeProvider } from "@/providers/DeviceTypeProvider";

type Props = {
  children: React.ReactNode;
  session: Session | null;
  deviceType: string;
};

export default function Providers({ children, session, deviceType }: Props) {
  return (
    <SessionProvider session={session}>
      <DeviceTypeProvider deviceType={deviceType}>
        <TRPCProvider>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </TRPCProvider>
      </DeviceTypeProvider>
    </SessionProvider>
  );
}