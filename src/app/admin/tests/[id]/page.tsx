"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { notFound, useParams } from "next/navigation";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { cn } from "@/shared/utils/helpers";
import { GeneralTab, MaterialsTab, QuestionsTab } from "@/features/admin/create-test/components";
import { useEditTestMutation, useGetByIdTestQuery } from "@/features/admin/create-test/hooks";
import { Form } from "@/shared/components/ui";
import type { GetByIdResponse } from "@/server/core/responses/TestService/GetByIdResponse";
import { useNotification } from "@/shared/hooks";
import { Loader } from "@/shared/components/ui/Loader";

export default function EditTestPage() {
	const n = useNotification();
	const { id } = useParams();
	const { test, isLoading } = useGetByIdTestQuery(id as string);
	const { editTest, isPending } = useEditTestMutation();

	const form = useForm<GetByIdResponse>();

	const { watch } = form;

	useEffect(() => {
		if (test) {
			form.reset({
				id: test.id,
				testName: test.testName ?? "",
				description: test.description ?? "",
				isEntryTest: test.isEntryTest ?? false,
				questions:
					test.questions.length > 0
						? test.questions
						: [{ questionText: "", answers: [{ answerText: "", isCorrect: false }] }],
				materials: test.materials.length > 0 ? test.materials : [{ title: "" }],
			});
		}
	}, [test, form]);

	const onSaveGeneral = async () => {
		if (!test) return;

		await editTest({
			testId: test.id,
			testName: watch("testName"),
			description: watch("description"),
			isEntryTest: watch("isEntryTest"),
		}).then(() => {
			n.success("Тест було успішно відредаговано");
		});
	};

	if (!test && !isLoading) return notFound();
	if (isLoading) return <Loader />;

	return (
		<Form form={form} className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold">Редагування тесту</h1>

			<TabGroup>
				<TabList className="flex space-x-2 border-b">
					{["Загальне", "Питання", "Матеріали"].map((tab, index) => (
						<Tab
							key={index}
							className={({ selected }) =>
								cn(
									"px-4 py-2 font-medium border-b-2",
									selected ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500",
								)
							}
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
						<QuestionsTab testId={test?.id} />
					</TabPanel>

					<TabPanel>
						<MaterialsTab testId={test?.id} />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</Form>
	);
}
