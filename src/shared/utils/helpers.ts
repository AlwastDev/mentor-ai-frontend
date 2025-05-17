import { clsx, type ClassValue } from "clsx";
import { createHmac } from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function computeHmac(email: string, secret: string) {
	return createHmac("sha256", secret).update(email).digest("hex").toUpperCase();
}
