"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { cn } from "@/shared/utils/helpers";
import {
	GeneralTab,
	MaterialsTab,
	QuestionsTab,
} from "@/features/admin/create-test/components";
import { Form } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";
import { useCreateTestMutation } from "@/features/admin/create-test/hooks";
import type { GetByIdResponse } from "@/server/core/responses/TestService/GetByIdResponse";
import { useNotification } from "@/shared/hooks";

export default function CreateTestPage() {
	const n = useNotification();
	const router = useRouter();
	const { createTest, isPending } = useCreateTestMutation();

	const form = useForm<GetByIdResponse>({
		defaultValues: {
			testName: "",
			description: "",
			isEntryTest: false,
			questions: [{ questionText: "", answers: [{ answerText: "", isCorrect: false }] }],
			materials: [{ title: "" }],
		},
	});

	const { watch } = form;

	const onSaveGeneral = async () => {
		const testId = await createTest({
			testName: watch("testName"),
			description: watch("description"),
			isEntryTest: watch("isEntryTest"),
		})

		if (!testId) {
			n.error("Створення тесту не вдалося");
			return;
		}

		router.push(`${ROUTES.Admin.Tests.Root}/${testId}`);
	};

	return (
		<Form form={form} className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold">Створення тесту</h1>

			<TabGroup>
				<TabList className="flex space-x-2 border-b">
					{["Загальне", "Питання", "Матеріали"].map((tab, index) => (
						<Tab
							key={index}
							className={({ selected, disabled }) =>
								cn(
									"px-4 py-2 font-medium border-b-2",
									selected ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500",
									disabled && "text-gray-300 cursor-not-allowed",
								)
							}
							disabled={index !== 0}
						>
							{tab}
						</Tab>
					))}
				</TabList>

				<TabPanels className="mt-4">
					<TabPanel> 
						<GeneralTab isDisabledSaveButton={isPending} onSaveGeneral={onSaveGeneral} />
					</TabPanel>

					<TabPanel>
						<QuestionsTab />
					</TabPanel>

					<TabPanel>
						<MaterialsTab />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</Form>
	);
}
