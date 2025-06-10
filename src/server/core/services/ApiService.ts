import { injectable } from "inversify";

import type { IApiService, SendRequestOptions } from "./interfaces/IApiService";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

@injectable()
export class ApiService implements IApiService {
	public async sendRequest<TResponse, TBody = unknown, TQuery = unknown>({
		url,
		method,
		body,
		query,
		accessToken,
	}: SendRequestOptions<TBody, TQuery> & {
		accessToken?: string;
	}): Promise<TResponse> {
		const backendUrl = env.BACKEND_URL;

		const filteredQuery = this.getFilteredQueryParams(query);
		const queryString = this.buildQueryString(filteredQuery);

		const requestUrl = `${backendUrl}/${url}${queryString}`;

		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		const response = await fetch(requestUrl, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		});

		let text = await response.text();

		if (!response.ok) {
			const trpcCodeMessage = this.transformStatusTextToTrpcCode(
				response.status,
			);

			throw new TRPCError({
				code: trpcCodeMessage,
				message: text.includes("message")
					? JSON.parse(text).message
					: `Request failed with status ${response.status}: ${JSON.parse(text)}`,
			});
		}

		if (!text) {
			return {} as TResponse;
		}

		let json: unknown;
		try {
			json = JSON.parse(text);
		} catch (err) {
			console.error("Invalid JSON response", err);
			throw new Error("Invalid JSON response");
		}

		if ((json as any)?.error) {
			throw new Error((json as any).message || "Unknown error");
		}

		return json as TResponse;
	}

	private getFilteredQueryParams(query: unknown): Record<string, string> {
		if (!query || typeof query !== "object") {
			return {};
		}
		return Object.fromEntries(
			Object.entries(query).filter(([, value]) => value !== undefined),
		) as Record<string, string>;
	}

	private buildQueryString(params: Record<string, string>): string {
		const entries = Object.entries(params);
		if (entries.length === 0) {
			return "";
		}
		return `?${new URLSearchParams(params).toString()}`;
	}

	private transformStatusTextToTrpcCode(
		statusCode: number,
	): TRPC_ERROR_CODE_KEY {
		switch (statusCode) {
			case 400:
				return "BAD_REQUEST";
			case 401:
				return "UNAUTHORIZED";
			case 403:
				return "FORBIDDEN";
			case 404:
				return "NOT_FOUND";
			case 409:
				return "CONFLICT";
			case 422:
				return "UNPROCESSABLE_CONTENT";
			case 429:
				return "TOO_MANY_REQUESTS";
			case 500:
			case 502:
			case 503:
			case 504:
				return "INTERNAL_SERVER_ERROR";
			default:
				return "INTERNAL_SERVER_ERROR";
		}
	}
}
