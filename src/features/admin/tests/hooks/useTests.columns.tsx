import { useMemo } from "react";

import { Button, type TableColumn } from "@/shared/components/ui";
import { type GetAllTestsResponse } from "@/server/core/responses/TestService.responses";

export const useTestsColumns = () => {
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
				title: "Вступний тест",
				dataIndex: "isEntryTest",
				mobileOrder: 3,
				isShowOnMobile: true,
				render: (_, record) => (
					<p className="truncate">{record.isEntryTest ? "✅" : "❌"}</p>
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
								<Button>Редагувати</Button>
								<Button>Видалити</Button>
								<Button>Опублікувати</Button>
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
