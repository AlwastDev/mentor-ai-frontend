"use client";
import { useRouter } from "next/navigation";

import { useGetAllTestsQuery, useTestsColumns } from "@/features/admin/tests/hooks";
import { Button, Table } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";
import { usePaginationQueryParams } from "@/shared/hooks";
import { Loader } from "@/shared/components/ui/Loader";

export default function TestsPage() {
	const router = useRouter();

	const { page, handlePageChange } = usePaginationQueryParams();
	const { tests, isLoading, refetch } = useGetAllTestsQuery(page);

	const handleRefetch = () => {
		refetch();
	};

	const { columns } = useTestsColumns({ handleRefetch });

	if (isLoading || !tests) {
		return <Loader />;
	}

	return (
		<div className="p-4">
			<div className="flex justify-between items-center my-4">
				<h1 className="text-2xl font-bold">Тести</h1>
				<Button onClick={() => router.push(ROUTES.Admin.Tests.Create)}>Створити тест</Button>
			</div>

			<Table data={tests} columns={columns} count={tests.length} onChangePage={handlePageChange} />
		</div>
	);
}
