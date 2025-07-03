"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { Gift } from "lucide-react";

import { useAuth } from "@/shared/hooks";
import { useGetExperienceHistoryQuery } from "../hooks";

export const XPProgressCard = () => {
	const { session, isChecking } = useAuth();
	const { experienceHistory, isLoading } = useGetExperienceHistoryQuery({
		enabled: !!session?.accessToCharts,
	});

	if (isChecking || isLoading) return null;

	if (!session?.accessToCharts) {
		return (
			<div className="relative rounded-xl border border-gray-200 p-4 shadow-sm">
				<div style={{ filter: "blur(5px)" }} className="pointer-events-none">
					<header className="mb-4 flex items-center justify-between">
						<h3 className="text-lg font-semibold">Прогрес&nbsp;XP</h3>
					</header>

					<div className="mb-6 flex items-center gap-3">
						<Gift className="h-10 w-10 text-yellow-500" strokeWidth={1.5} />

						<div className="flex flex-col space-y-1">
							<span className="text-base text-gray-500">Кількість XP</span>

							<span className="text-sm text-gray-500">{100} XP</span>
						</div>
					</div>

					<ResponsiveContainer width="100%" height={120}>
						<LineChart
							data={[
								{ day: "Monday", xp: 1 },
								{ day: "Tuesday", xp: 10 },
								{ day: "Wednesday", xp: 50 },
								{ day: "Thursday", xp: 30 },
								{ day: "Friday", xp: 20 },
								{ day: "Saturday", xp: 70 },
								{ day: "Sunday", xp: 90 },
							]}
							margin={{ left: -20, right: 4, top: 5, bottom: 0 }}
						>
							<Tooltip
								contentStyle={{ fontSize: "0.75rem", borderRadius: "0.5rem" }}
								formatter={(v: number) => [`${v} XP`, ""]}
								labelFormatter={(l: string) => `Тест ${Number(l) + 1}`}
							/>
							<YAxis hide domain={[0, 10]} />
							<Line
								type="monotone"
								dataKey="xp"
								stroke="#facc15"
								strokeWidth={2}
								dot={{ r: 3 }}
								activeDot={{ r: 5 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="absolute inset-0 flex items-center justify-center">
					<span className="rounded-lg bg-white/80 px-3 py-1 text-sm font-medium text-gray-800">
						Отримайте доступ, щоб переглядати графік
					</span>
				</div>
			</div>
		);
	}

	if (session?.accessToCharts && !isLoading && experienceHistory.length === 0) {
		return (
			<div className="rounded-xl border border-gray-200 p-4 shadow-sm">
				<header className="mb-4 flex items-center justify-between">
					<h3 className="text-lg font-semibold">Прогрес&nbsp;XP</h3>
				</header>

				<div className="flex h-24 items-center justify-center text-sm text-gray-500">
					Дані про досвід поки відсутні
				</div>
			</div>
		);
	}

	const chartData = experienceHistory.map((entry) => {
		const dateObj = new Date(entry.creationDate);
		const name = dateObj.toLocaleDateString("uk-UA", {
			day: "2-digit",
			month: "2-digit",
		});
		return { name, xp: entry.experience };
	});

	const maxXP = chartData.reduce((max, d) => Math.max(max, d.xp), 0);

	return (
		<div className="rounded-xl border border-gray-200 p-4 shadow-sm">
			<header className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold">Прогрес&nbsp;XP</h3>
			</header>

			<div className="mb-6 flex items-center gap-3">
				<Gift className="h-10 w-10 text-yellow-500" strokeWidth={1.5} />

				<div className="flex flex-col space-y-1">
					<span className="text-base text-gray-500">Кількість XP</span>

					<span className="text-sm text-gray-500">
						{session?.experience} XP
					</span>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={120}>
				<LineChart
					data={chartData}
					margin={{ left: -20, right: 4, top: 5, bottom: 0 }}
				>
					<Tooltip
						contentStyle={{ fontSize: "0.75rem", borderRadius: "0.5rem" }}
						formatter={(v: number) => [`${v} XP`, ""]}
						labelFormatter={(l: string) => `Тест ${Number(l) + 1}`}
					/>
					<YAxis hide domain={[0, maxXP]} />
					<Line
						type="monotone"
						dataKey="xp"
						stroke="#facc15"
						strokeWidth={2}
						dot={{ r: 3 }}
						activeDot={{ r: 5 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
