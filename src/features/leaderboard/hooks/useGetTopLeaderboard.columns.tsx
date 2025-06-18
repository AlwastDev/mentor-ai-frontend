import { Trophy, Award, Star } from "lucide-react";

import type { TableColumn } from "@/shared/components/ui";
import type { GetTopLeaderboardResponse } from "@/server/core/responses/LeaderboardService/GetTopLeaderboardResponse";


export const useGetTopLeaderboardColumns = () => {
	const columns: TableColumn<GetTopLeaderboardResponse>[] = [
		{
			title: "#",
			dataIndex: "rank",
			mobileOrder: 1,
			isShowOnMobile: true,
			render: (key, record) => (
				<span className="flex items-center justify-center">
					{getRankIcon(record[key] as number)}
				</span>
			),
			thClassName: "w-12 text-center",
			tdClassName: "text-center",
		},
		{
			title: "Name",
			dataIndex: "name",
			mobileOrder: 2,
			isShowOnMobile: true,
			thClassName: "min-w-[120px]",
		},
		{
			title: "Coins",
			dataIndex: "coins",
			mobileOrder: 3,
			isShowOnMobile: false,
			tdClassName: "text-center",
			thClassName: "text-center",
		},
		{
			title: "Experience",
			dataIndex: "experience",
			mobileOrder: 4,
			isShowOnMobile: true,
			tdClassName: "text-center",
			thClassName: "text-center",
		},
	];

	return { columns };
};

function getRankIcon(rank: number) {
  if (rank === 1)
    return <Trophy className="text-amber-400 h-5 w-5" strokeWidth={2} />;
  if (rank === 2)
    return <Award className="text-gray-300 h-5 w-5" strokeWidth={2} />;
  if (rank === 3)
    return <Star className="text-amber-700 h-5 w-5" strokeWidth={2} />;
  return rank;
}