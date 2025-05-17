"use client";
import { useEffect, useState } from "react";

import { useDeviceType } from "@/providers/DeviceTypeProvider";

export default function useWindowSize(debounceMs = 500) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const isServer = typeof window === "undefined";

	const { deviceType } = useDeviceType();

	const [isDefaultSize, setIsDefaultSize] = useState(true);

	const [windowSize, setWindowSize] = useState({
		height: deviceType !== "desktop" ? 800 : 1080,
		width: deviceType !== "desktop" ? 360 : 1920,
	});

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		function handleResize() {
			clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
				setIsDefaultSize(false);
			}, debounceMs);
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("resize", handleResize);
		};
	}, [debounceMs]);

	const { width, height } = windowSize;

	const isMobile = width < 640;
	const isTablet = width < 768;
	const isSmallLaptop = width < 1024;
	const isLaptop = width < 1280;
	const isWideScreen = width < 1536;

	return {
		width,
		height,
		isMobile,
		isTablet,
		isSmallLaptop,
		isLaptop,
		isWideScreen,
		isDefaultSize,
	};
}
