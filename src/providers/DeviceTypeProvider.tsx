"use client";

import { createContext, useContext } from "react";

interface DeviceTypeContextValue {
	deviceType: string;
}

export const DeviceTypeContext = createContext<DeviceTypeContextValue>({
	deviceType: "desktop",
});

type DeviceTypeProviderProps = {
	deviceType: string;
	children: React.ReactNode;
};

export function DeviceTypeProvider({ deviceType, children }: DeviceTypeProviderProps) {
	return <DeviceTypeContext.Provider value={{ deviceType }}>{children}</DeviceTypeContext.Provider>;
}

export function useDeviceType() {
	return useContext(DeviceTypeContext);
}
