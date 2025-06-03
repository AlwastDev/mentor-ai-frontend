"use client";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePaginationQueryParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [page, setPage] = useState<number>(
		Number(searchParams.get("page")) || 1,
	);

	const updateQueryParams = useCallback(
		(newPage: number) => {
			const query: Record<string, any> = {};

			if (newPage) query.page = newPage;

			router.replace(`${pathname}?${new URLSearchParams(query).toString()}`);
		},
		[router],
	);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		updateQueryParams(newPage);
	};

	useEffect(() => {
		updateQueryParams(page);
	}, [page]);

	return {
		page,
		handlePageChange,
	};
};
