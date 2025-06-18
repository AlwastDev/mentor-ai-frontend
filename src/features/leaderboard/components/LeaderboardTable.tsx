"use client";

import { motion } from "framer-motion";

import { Table } from "@/shared/components/ui/Table";
import { useGetTopLeaderboardColumns } from "../hooks/useGetTopLeaderboard.columns";
import type { GetTopLeaderboardResponse } from "@/server/core/responses/LeaderboardService/GetTopLeaderboardResponse";

interface LeaderboardTableProps {
	leaderboard: GetTopLeaderboardResponse[];
}

export function LeaderboardTable(props: LeaderboardTableProps) {
	const { leaderboard } = props;

	const { columns } = useGetTopLeaderboardColumns();

	const data = leaderboard.map((item, idx) => ({ ...item, rank: idx + 1 }));

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="w-full"
		>
			<Table data={data} columns={columns} count={data.length} />
		</motion.div>
	);
}
