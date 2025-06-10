export type GetRoadmapResponse = {
	id: string;
	testId: string;
	title: string;
	description: string | null;
	order: number;
	assignedDate: string;
	completedDate: string | null;
};
