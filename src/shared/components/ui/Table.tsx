"use client";
import { type JSX, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/shared/utils/helpers";
import useWindowSize from "@/shared/hooks/useWindowSize.hook";
import { DESKTOP_PAGE_SIZE } from "@/shared/utils/constants";

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

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
	const {
		data,
		columns: desktopColumns,
		count,
		currentPage,
		onChangePage,
	} = props;

	const { isMobile } = useWindowSize();
	const searchParams = useSearchParams();

	const defaultPage =
		currentPage ??
		(searchParams.get("page") ? Number(searchParams.get("page")) : 1);

	const [page, setPage] = useState<number>(defaultPage);

	const pageChangeHandler = useCallback(
		(page: number) => {
			setPage(page);
			if (onChangePage) {
				onChangePage(page);
			}
		},
		[setPage, onChangePage],
	);

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
				"text-dusty-gray flex w-full grow flex-col gap-y-7 text-base",
			)}
		>
			<div className="grow">
				<table
					className={cn(
						"w-full table-fixed border-separate border-spacing-x-0 border-spacing-y-px",
						"border-white-7 rounded-xl border",
					)}
				>
					<thead className="bg-cod-gray table-header-group">
						<tr className="text-left">
							{columns.map((column, idx) => (
								<th
									key={idx}
									className={cn(
										"border-white-7 border-b p-4 text-sm font-normal leading-4",
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
												"border-white-7 border-b": idx !== data.length - 1,
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
			{onChangePage && (
				<Pagination
					perPage={DESKTOP_PAGE_SIZE}
					page={page}
					total={count}
					onChangePage={pageChangeHandler}
				/>
			)}
		</div>
	);
}

type PaginationProps = {
	page: number;
	total: number;
	perPage: number;
	onChangePage: (page: number) => void;
};

function Pagination(props: PaginationProps) {
	const { page, total, perPage, onChangePage } = props;

	const totalPages = Math.ceil(total / perPage);

	const onPrevPage = () => {
		if (page === 1) return;
		onChangePage(page - 1);
	};

	const onNextPage = () => {
		if (page === totalPages) return;
		onChangePage(page + 1);
	};

	if (totalPages === 0) return null;

	const isDisabledPreviousButton = page <= 1;
	const isDisabledNextButton = page >= totalPages;

	const buttonClasses =
		"w-[100px] cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200";
	const activeButton =
		"bg-blue-600 border-blue-600 text-white hover:bg-blue-700";
	const disabledButton =
		"bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed";

	return (
		<div className="flex h-10 items-center justify-between gap-4 sm:mx-4">
			<button
				className={cn(buttonClasses, {
					[disabledButton]: isDisabledPreviousButton,
					[activeButton]: !isDisabledPreviousButton,
				})}
				disabled={isDisabledPreviousButton}
				onClick={onPrevPage}
			>
				Назад
			</button>
			<p className="text-sm font-medium text-gray-700">
				Сторінка {page} з {totalPages}
			</p>
			<button
				className={cn(buttonClasses, {
					[disabledButton]: isDisabledNextButton,
					[activeButton]: !isDisabledNextButton,
				})}
				disabled={isDisabledNextButton}
				onClick={onNextPage}
			>
				Далі
			</button>
		</div>
	);
}
