"use client";

import { BarChart3, BrainCircuit, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback } from "react";

import { Button, Icon } from "@/shared/components/ui";
import { FeatureCard, PlansSection } from "@/features/home/components";
import { useAuth, useNotification } from "@/shared/hooks";
import { ROUTES } from "@/shared/utils/routes";
import { Loader } from "@/shared/components/ui/Loader";
import { useStartEntryTestAttemptMutation } from "@/features/home/hooks";

export default function HomePage() {
	const router = useRouter();
	const n = useNotification();
	const { isAuthed, isChecking, isAdmin } = useAuth();
	const { startEntryTestAttempt, isPending } =
		useStartEntryTestAttemptMutation();

	const handleStartTest = useCallback(() => {
		if (!isAuthed || isChecking) {
			router.push(ROUTES.SignIn);
			return;
		}

		if(isAdmin) {
			n.error("Адміністратор не може проходити вступний тест");
			return;
		}

		startEntryTestAttempt();
	}, [isAuthed, isChecking, isAdmin, startEntryTestAttempt, router, n]);

	if (isChecking) {
		return <Loader />;
	}

	return (
		<div className="min-h-screen overflow-x-hidden">
			<section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-28 pt-32 text-center lg:flex-row lg:justify-between lg:text-left">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="max-w-2xl"
				>
					<h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-5xl xl:text-6xl">
						Прокачай&nbsp;
						<span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
							свої навички
						</span>{" "}
						програмування за допомогою&nbsp;AI
					</h1>
					<p className="mb-8 text-lg text-zinc-600 dark:text-zinc-300">
						Персоналізований навчальний шлях, аналітика прогресу та рейтингова
						система – усе в одному місці.
					</p>
					<div className="flex flex-col items-center gap-4 sm:flex-row">
						<Button
							disabled={isPending}
							onClick={handleStartTest}
							className="inline-flex items-center justify-center"
						>
							Почати вступний тест
						</Button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="mt-12 w-full max-w-xl lg:mt-0"
				>
					<Icon icon="education_illustration" className="h-auto w-full" />
				</motion.div>
			</section>

			<section className="mx-auto mb-32 max-w-6xl px-6">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="mb-16 text-center text-3xl font-bold dark:text-white sm:text-4xl"
				>
					Чому обирають нас?
				</motion.h2>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						Icon={BarChart3}
						title="Глибока аналітика"
						desc="Відстежуй прогрес, слабкі місця та отримуй поради щодо покращення."
					/>
					<FeatureCard
						Icon={BrainCircuit}
						title="AI-наставник"
						desc="Персоналізовані підказки та пояснення саме під твій рівень."
					/>
					<FeatureCard
						Icon={UsersRound}
						title="Лідерборд"
						desc="Змагайся з друзями, піднімайся у рейтингу та заробляй нагороди."
					/>
				</div>
			</section>

			<section className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-sky-500 py-20 text-center text-white dark:from-indigo-600 dark:to-sky-600">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mx-auto max-w-3xl px-6"
				>
					<h3 className="mb-4 text-3xl font-semibold sm:text-4xl">
						Пройди 10-хвилинний Entry Test
					</h3>
					<p className="mb-8 text-lg opacity-90">
						Визначимо твій поточний рівень і одразу сформуємо індивідуальний
						Roadmap.
					</p>
					<Button
						disabled={isPending}
						onClick={handleStartTest}
						className="inline-flex items-center justify-center"
					>
						Почати тест
					</Button>
				</motion.div>
			</section>

			<section className="bg-zinc-50 px-6 pb-28 pt-32 dark:bg-zinc-900">
				<PlansSection />
			</section>
		</div>
	);
}
