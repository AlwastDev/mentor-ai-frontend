"use client";
import { type JSX, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/shared/utils/helpers";
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

	return (
		<div
			className={cn(
				"flex w-full grow flex-col gap-y-7 text-base text-dusty-gray",
			)}
		>
			<div className="grow">
				<table
					className={cn(
						"w-full table-fixed border-separate border-spacing-x-0 border-spacing-y-px",
						"border border-white-7 rounded-xl",
					)}
				>
					<thead className="table-header-group bg-cod-gray">
						<tr className="text-left">
							{columns.map((column, idx) => (
								<th
									key={idx}
									className={cn(
										"text-sm leading-4 font-normal border-b border-white-7 p-4",
										{
											"rounded-tl-xl pl-4": idx === 0,
											"rounded-tr-xl pr-4": idx === columns.length - 1,
										},
										column.thClassName,
									)}
								>
									{column.headerRender
										? column.headerRender(column.dataIndex, column)
										: column.title}
								</th>
							))}
						</tr>
					</thead>

					<tbody className="table-row-group">
						{data.map((record, idx) => (
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
											"table-cell p-4",
											{
												"border-b border-white-7": idx !== data.length - 1,
											},
											tdClassName,
										)}
									>
										{render ? render(dataIndex, record) : record[dataIndex]}
									</td>
								))}
							</tr>
						))}
					</tbody>
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
