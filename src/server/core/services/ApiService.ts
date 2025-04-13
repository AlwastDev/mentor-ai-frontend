import { injectable } from "inversify";

import { defineBackendUrl } from "@/app/api/defineBackendUrl";
import type { IApiService, SendRequestOptions } from "./interfaces/IApiService";

@injectable()
export class ApiService implements IApiService {
	public async sendRequest<TResponse, TBody = unknown, TQuery = unknown>({
		url,
		method,
		body,
		query,
	}: SendRequestOptions<TBody, TQuery>): Promise<TResponse | null> {
		const backendUrl = await defineBackendUrl();

		const filteredQuery = this.getFilteredQueryParams(query);
		const queryString = this.buildQueryString(filteredQuery);

		const requestUrl = `${backendUrl}/${url}${queryString}`;

		const response = await fetch(requestUrl, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		// if (!response.ok) {
		//   throw new Error(`Request failed with status ${response.status}`);
		// }

		const json = await response.json();

		if (json === null) {
			return null;
		}

		if (json.error) {
			throw new Error(json.message || "Unknown error");
		}

		return json as TResponse;
	}

	private getFilteredQueryParams(query: unknown): Record<string, string> {
		if (!query || typeof query !== "object") {
			return {};
		}
		return Object.fromEntries(
			Object.entries(query).filter(([, value]) => value !== undefined)
		) as Record<string, string>;
	}

	private buildQueryString(params: Record<string, string>): string {
		const entries = Object.entries(params);
		if (entries.length === 0) {
			return "";
		}
		return `?${new URLSearchParams(params).toString()}`;
	}
}
