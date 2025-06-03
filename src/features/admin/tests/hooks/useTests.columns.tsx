import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button, type TableColumn } from "@/shared/components/ui";
import { useDeleteTestMutation, usePublishTestMutation } from "../hooks";
import { ROUTES } from "@/shared/utils/routes";
import type { GetAllTestsResponse } from "@/server/core/responses/TestService/GetAllTestsResponse";

type UseTestsColumnsProps = {
	handleRefetch: () => void;
};

export const useTestsColumns = (props: UseTestsColumnsProps) => {
	const { handleRefetch } = props;

	const router = useRouter();
	const { deleteTest } = useDeleteTestMutation();
	const { publishTest } = usePublishTestMutation();

	const handleDeleteTest = (id: string) => async () => {
		await deleteTest(id);
		handleRefetch();
	};

	const handleEditTest = (id: string) => () => {
		router.push(`${ROUTES.Admin.Tests.Root}/${id}`);
	};

	const handlePublishTest = (id: string) => async () => {
		await publishTest(id);
		handleRefetch();
	};

	const testColumns: TableColumn<GetAllTestsResponse>[] = useMemo(
		() => [
			{
				title: "Назва",
				dataIndex: "testName",
				mobileOrder: 1,
				isShowOnMobile: true,
			},
			{
				title: "Опис",
				dataIndex: "description",
				mobileOrder: 2,
				isShowOnMobile: true,
				render: (_, record) => <p className="truncate">{record.description ?? "-"}</p>,
			},
			{
				title: "Вступний тест",
				dataIndex: "isEntryTest",
				mobileOrder: 3,
				isShowOnMobile: true,
				render: (_, record) => <p className="truncate">{record.isEntryTest ? "✅" : "❌"}</p>,
			},
			{
				title: "Опубліковано",
				dataIndex: "isPublished",
				mobileOrder: 4,
				isShowOnMobile: true,
				render: (_, record) => <p className="truncate">{record.isPublished ? "✅" : "❌"}</p>,
			},
			{
				title: "Дії",
				dataIndex: "id",
				mobileOrder: 5,
				isShowOnMobile: true,
				render: (_, record) => (
					<>
						{!record.isPublished && (
							<div className="flex gap-x-2">
								<Button onClick={handleEditTest(record.id)}>Редагувати</Button>
								<Button onClick={handleDeleteTest(record.id)}>Видалити</Button>
								<Button onClick={handlePublishTest(record.id)}>Опублікувати</Button>
							</div>
						)}
					</>
				),
			},
		],
		[],
	);

	return { columns: testColumns };
};
