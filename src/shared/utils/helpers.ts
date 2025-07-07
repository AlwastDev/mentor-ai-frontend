import { clsx, type ClassValue } from "clsx";
import { createHmac } from "crypto";
import { twMerge } from "tailwind-merge";
import { marked } from "marked";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function computeHmac(email: string, secret: string) {
	return createHmac("sha256", secret).update(email).digest("hex").toUpperCase();
}

export async function markdownToHtml(markdown: string): Promise<string> {
	const rawHtml = await marked.parse(markdown, {
		breaks: true,
		gfm: true,
	});

	return rawHtml;
}
