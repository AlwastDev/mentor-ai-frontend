"use client";
import { SnackbarProvider } from "notistack";

import { TRPCProvider } from "@/providers/TRPCProvider";
import { DeviceTypeProvider } from "@/providers/DeviceTypeProvider";

type Props = {
	children: React.ReactNode;
	deviceType: string;
};

export default function Providers({ children, deviceType }: Props) {
	return (
		<DeviceTypeProvider deviceType={deviceType}>
			<TRPCProvider>
				<SnackbarProvider>{children}</SnackbarProvider>
			</TRPCProvider>
		</DeviceTypeProvider>
	);
}
