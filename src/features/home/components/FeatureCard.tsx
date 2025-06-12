import { motion } from "framer-motion";

type FeatureCardProps = {
	Icon: React.ComponentType<{ className?: string }>;
	title: string;
	desc: string;
};

export function FeatureCard(props: FeatureCardProps) {
	const { Icon, title, desc } = props;

	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4 }}
			className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg"
		>
			<Icon className="mb-4 h-10 w-10 text-sky-600" />
			<h3 className="mb-2 text-xl font-semibold">{title}</h3>
			<p className="text-center text-zinc-600">{desc}</p>
		</motion.article>
	);
}
