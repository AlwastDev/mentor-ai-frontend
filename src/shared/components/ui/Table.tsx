"use client";
import { JSX, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/shared/utils/helpers";
import { Icon } from "./Icon";
import useWindowSize from "@/shared/hooks/useWindowSize.hook";

export type TableColumn<T> = {
	title: string;
	dataIndex: keyof T;
	mobileOrder: number;
	isShowOnMobile: boolean;
	headerRender?: (value: keyof T, column: TableColumn<T>) => JSX.Element;
	render?: (value: keyof T, record: T) => JSX.Element;
	thClassName?: string;
	tdClassName?: string;
};

type TableProps<T> = {
	data: T[];
	columns: TableColumn<T>[];
	isLoading?: boolean;
	count: number;
	currentPage?: number;
	onChangePage?: (page: number) => void;
	// rowHandleClick?: (record: T & { id: string | number }) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>(props: TableProps<T>) {
	const {
		data,
		columns: desktopColumns,
		isLoading,
		//count,
		currentPage,
		//onChangePage
	} = props;

	const { isMobile } = useWindowSize();
	const searchParams = useSearchParams();

	const defaultPage =
		currentPage ??
		(searchParams.get("page") ? Number(searchParams.get("page")) : 1);

	const [page, setPage] = useState<number>(defaultPage);

	// const pageChangeHandler = useCallback(
	// 	(page: number) => {
	// 		setPage(page);
	// 		if (onChangePage) {
	// 			onChangePage(page);
	// 		}
	// 	},
	// 	[setPage, onChangePage]
	// );

	useEffect(() => {
		if (defaultPage !== page) {
			setPage(defaultPage);
		}
	}, [defaultPage, page]);

	const sortedColumns = desktopColumns
		.filter((column) => column.isShowOnMobile)
		.slice()
		.sort((a, b) => a.mobileOrder - b.mobileOrder);

	const columns = isMobile ? sortedColumns : desktopColumns;

	let body = null;

	if (isLoading) {
		body = (
			<>
				{Array.from({ length: 10 }).map((_, idx) => (
					<tr key={`loading-${idx}`}>
						<td
							colSpan={columns.length}
							className="py-6 w-full"
						>
							<div className="animate-pulse flex w-fit mx-auto items-center gap-x-[5vw]">
								<div className="flex items-center gap-x-2">
									<div className="w-2 h-4 rounded-full bg-white-7" />
									<div className="size-9 rounded-full bg-white-7" />
									<div className="relative shrink-0 flex items-center gap-x-2">
										<div className="w-[150px] h-6 rounded-full bg-white-7" />
										<div className="absolute right-5 w-[34px] h-6 rounded-full bg-white-7" />
									</div>
								</div>

								<div className="hidden sm:block h-6 w-[90px] rounded-full bg-white-7" />
								<div className="h-6 hidden sm:block w-[70px] rounded-full bg-white-7" />
								<div className="h-6 hidden sm:block w-[105px] rounded-full bg-white-7" />
								<div className="h-6 hidden md:block w-10 rounded-full bg-white-7" />
								<div className="h-6 hidden md:block w-[60px] rounded-full bg-white-7" />
							</div>
						</td>
					</tr>
				))}
			</>
		);
	} else if (data.length > 0) {
		body = (
			<>
				{data.map((record) => (
					<tr
						key={record.id}
						className="group table-row"
						// onClick={() =>
						// 	rowHandleClick && rowHandleClick({ ...record, id: record.id })
						// }
					>
						{columns.map(({ dataIndex, render, tdClassName }, colIdx) => (
							<td
								key={colIdx}
								className={cn(
									"table-cell border-b border-white-7 p-4",
									tdClassName
								)}
							>
								{render ? render(dataIndex, record) : record[dataIndex]}
							</td>
						))}
					</tr>
				))}
			</>
		);
	} else {
		body = (
			<>
				<tr>
					<td
						colSpan={columns.length}
						className="py-[10px] sm:py-5 mx-auto px-6"
					>
						<div className="flex items-center justify-center gap-x-2">
							<Icon icon="warning" className="size-4 shrink-0" />
							<p className="text-base text-dusty-gray font-semibold leading-normal">
								An error occurred loading tokens. Please try again.
							</p>
						</div>
					</td>
				</tr>
			</>
		);
	}

	return (
		<div
			className={cn(
				"flex w-full grow flex-col gap-y-7 text-base text-dusty-gray"
			)}
		>
			<div className="grow">
				<table
					className={cn(
						"w-full table-fixed border-separate border-spacing-x-0 border-spacing-y-px",
						"border border-white-7 rounded-xl"
					)}
				>
					<thead className="table-header-group bg-cod-gray">
						<tr className="text-left">
							{columns.map((column, idx) => (
								<th
									key={idx}
									className={cn(
										"text-sm leading-4 font-normal border-b border-white-7 py-4",
										{
											"rounded-tl-xl pl-6": idx === 0,
											"rounded-tr-xl pr-6": idx === columns.length - 1,
										},
										column.thClassName
									)}
								>
									{column.headerRender
										? column.headerRender(column.dataIndex, column)
										: column.title}
								</th>
							))}
						</tr>
					</thead>

					<tbody className="table-row-group">{body}</tbody>
				</table>
			</div>
			{/* {onChangePage && (
				<Pagination
					perPage={DESKTOP_PAGE_SIZE}
					page={page}
					total={count}
					onChangePage={pageChangeHandler}
				/>
			)} */}
		</div>
	);
}
