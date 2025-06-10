import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button, type TableColumn } from "@/shared/components/ui";
import { useDeleteTestMutation, usePublishTestMutation } from "../hooks";
import { ROUTES } from "@/shared/utils/routes";
import type { GetAllTestsResponse } from "@/server/core/responses/TestService/GetAllTestsResponse";
import { trpc } from "@/shared/utils/trpc";

export const useTestsColumns = () => {
	const utils = trpc.useUtils();
	const router = useRouter();
	const { deleteTest } = useDeleteTestMutation();
	const { publishTest } = usePublishTestMutation();

	const handleDeleteTest = useCallback(
		async (id: string) => {
			await deleteTest(id);
			utils.test.getAllTests.invalidate();
		},
		[deleteTest, utils],
	);

	const handleEditTest = useCallback(
		(id: string) => {
			router.push(`${ROUTES.Admin.Tests.Root}/${id}`);
		},
		[router],
	);

	const handlePublishTest = useCallback(
		async (id: string) => {
			await publishTest(id);
			utils.test.getAllTests.invalidate();
		},
		[publishTest, utils],
	);

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
				render: (_, record) => (
					<p className="truncate">{record.description ?? "-"}</p>
				),
			},
			{
				title: "Опубліковано",
				dataIndex: "isPublished",
				mobileOrder: 4,
				isShowOnMobile: true,
				render: (_, record) => (
					<p className="truncate">{record.isPublished ? "✅" : "❌"}</p>
				),
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
								<Button onClick={() => handleEditTest(record.id)}>
									Редагувати
								</Button>
								<Button onClick={() => handleDeleteTest(record.id)}>
									Видалити
								</Button>
								<Button onClick={() => handlePublishTest(record.id)}>
									Опублікувати
								</Button>
							</div>
						)}
					</>
				),
			},
		],
		[handleDeleteTest, handleEditTest, handlePublishTest],
	);

	return { columns: testColumns };
};
