"use client";
import { useRouter } from "next/navigation";

import {
	useGetAllTestsQuery,
	useTestsColumns,
} from "@/features/admin/tests/hooks";
import { Button, Loader, Table } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";
import { usePaginationQueryParams } from "@/shared/hooks";

export default function TestsPage() {
	const router = useRouter();

	const { page, handlePageChange } = usePaginationQueryParams();
	const { tests, total, isLoading } = useGetAllTestsQuery(page);
	const { columns } = useTestsColumns();

	if (isLoading || !tests) {
		return <Loader />;
	}

	return (
		<div className="p-4">
			<div className="my-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Тести</h1>
				<Button onClick={() => router.push(ROUTES.Admin.Tests.Create)}>
					Створити тест
				</Button>
			</div>

			<Table
				data={tests}
				columns={columns}
				count={total}
				onChangePage={handlePageChange}
			/>
		</div>
	);
}
