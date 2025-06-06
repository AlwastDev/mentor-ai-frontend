	"use client";

	import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
	import { trpc } from "@/shared/utils/trpc";
	import { httpBatchLink, loggerLink } from "@trpc/client";
	import superjson from "superjson";
	import { useState } from "react";

	const getBaseUrl = () => {
		if (typeof window !== "undefined") return ""; // browser should use relative url
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
		return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
	};

	export function TRPCProvider({ children }: { children: React.ReactNode }) {
		const [queryClient] = useState(
			() =>
				new QueryClient({
					defaultOptions: {
						queries: {
							refetchOnWindowFocus: false,
							retry: false,
							staleTime: Infinity,
						},
					},
				}),
		);

		const [trpcClient] = useState(() =>
			trpc.createClient({
				links: [
					loggerLink({
						enabled: (opts) =>
							process.env.NODE_ENV === "development" ||
							(opts.direction === "down" && opts.result instanceof Error),
					}),
					httpBatchLink({
						url: `${getBaseUrl()}/api/trpc`,
						async fetch(input, init) {
							const res = await fetch(input, init);
			
							if (res.status === 401) {
								const refreshResponse = await fetch('/api/auth/refresh', {
									method: 'POST',
									credentials: 'include',
								});

								if (refreshResponse.ok) {
									return fetch(input, init);
								} else {
									if (window.location.pathname !== "/auth/sign-in") {
										window.location.href = "/auth/sign-in";
									}

									throw new Error('Not authorized');
								}
							}
			
							return res;
						},
					}),
				],
				transformer: superjson,
			}),
		);

		return (
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</trpc.Provider>
		);
	}
