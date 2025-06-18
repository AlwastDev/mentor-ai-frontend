'use client';

import { useGetTopLeaderboardQuery } from "@/features/leaderboard/hooks";
import { Loader } from "@/shared/components/ui";
import { LeaderboardTable } from "@/features/leaderboard/components";

// prettier-ignore
export const dynamic = "force-dynamic";

export default function LeaderboardPage() {
	const { topLeaderboard, isLoading } = useGetTopLeaderboardQuery();

	if (isLoading) {
		return <Loader />;
	}

	if (topLeaderboard.length === 0) {
		return <div>Немає даних для таблиці лідерів</div>;
	}

	return (
		<div className="flex w-full flex-col items-center gap-6 px-4 py-10">
			<h1 className="text-3xl font-semibold text-white">Таблиця лідерів</h1>
			<LeaderboardTable leaderboard={topLeaderboard} />
			<p className="max-w-xl text-center text-sm text-dusty-gray">
				Примітка: Таблиця лідерів оновлюється періодично і може не відображати ваш останній прогрес негайно.
			</p>
		</div>
	);
}
