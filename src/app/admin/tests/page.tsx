"use client";
import { useRouter } from "next/navigation";

import { useGetAllTestsQuery } from "@/features/admin/hooks";
import { useTestsColumns } from "@/features/admin/tests/hooks";
import { Button, Table } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";

export default function AdminTestsPage() {
	const router = useRouter();

	const { tests, isLoading } = useGetAllTestsQuery();
	const { columns } = useTestsColumns();

	if (isLoading || !tests) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-4">
			<div className="flex justify-between items-center my-4">
				<h1 className="text-2xl font-bold">Тести</h1>
				<Button onClick={() => router.push(ROUTES.Admin.CreateTest)}>
					Створити тест
				</Button>
			</div>

			<Table data={tests} columns={columns} count={tests.length} />
		</div>
	);
}
