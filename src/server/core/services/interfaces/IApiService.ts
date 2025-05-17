export enum HttpMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

export interface SendRequestOptions<TBody, TQuery> {
	url: string;
	method: HttpMethod;
	body?: TBody;
	query?: TQuery;
}

export interface IApiService {
	sendRequest<TResponse, TBody = unknown, TQuery = unknown>(
		params: SendRequestOptions<TBody, TQuery> & { accessToken?: string },
	): Promise<TResponse>;
}
