"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { motion, AnimatePresence } from "framer-motion";

import { useChatWs } from "../hooks";
import { env } from "@/env.mjs";
import { cn } from "@/shared/utils/helpers";

type ChatWidgetProps = {
	testId: string;
};

export function ChatWidget(props: ChatWidgetProps) {
	const { testId } = props;

	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");

	const { messages, send, connected, typing } = useChatWs(
		`${env.NEXT_PUBLIC_CHAT_WSS_URL}?testId=${testId}`,
	);

	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(
		() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
		[messages],
	);

	return (
		<>
			<button
				onClick={() => setOpen((o) => !o)}
				className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
			>
				{open ? <X /> : <MessageCircle />}
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						key="chat-window"
						initial={{ opacity: 0, scale: 0.8, y: 50 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 50 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="fixed inset-x-0 bottom-0 z-40 flex h-[70vh] w-full flex-col rounded-t-xl border-t bg-white shadow-2xl sm:bottom-24 sm:left-auto sm:right-6 sm:h-[400px] sm:w-[30%] sm:rounded-xl sm:border sm:border-t sm:shadow-2xl"
					>
						<div className="flex items-center justify-between border-b px-4 py-2">
							<h4 className="font-semibold">AI Асистент</h4>
							<span
								className={
									connected
										? "h-2 w-2 rounded-full bg-green-500"
									: "h-2 w-2 rounded-full bg-red-500"
								}
							/>
						</div>

						<div className="flex-1 space-y-2 overflow-y-auto px-4 py-2 text-sm">
							{messages.map((m, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: m.role === "user" ? 40 : -40 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: m.role === "user" ? 40 : -40 }}
									transition={{ type: "spring", stiffness: 300, damping: 30 }}
									className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
								>
									<div
										className={cn(
											"max-w-[80%] break-words rounded-lg px-2",
											m.role === "user"
												? "bg-blue-50 text-blue-800"
												: "bg-gray-100 text-gray-800"
										)}
									>
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											rehypePlugins={[rehypeHighlight]}
											components={{
												code({ className, children, ...props }) {
													const isBlock = !!className;
													if (isBlock) {
														return (
															<pre
																className="whitespace-pre-wrap break-words rounded-lg py-3 text-[0.85rem] font-bold"
																{...props as React.HTMLAttributes<HTMLPreElement>}
															>
																<code className={className}>{children}</code>
															</pre>
														);
													}
													return (
														<code
															className="rounded bg-gray-200 px-1 py-0.5"
															{...props}
														>
															{children}
														</code>
													);
												},
												p({ children, ...props }) {
													return (
														<p
															className={
																m.role === "user"
																? "my-2"
																: "my-2"
															}
															{...props}
														>
															{children}
														</p>
													);
												},
											}}
										>
											{m.content}
										</ReactMarkdown>
									</div>
								</motion.div>
							))}
							{typing && (
								<p className="flex items-center gap-1 italic text-gray-500">
									<span className="animate-pulse">…</span> Асистент друкує
								</p>
							)}
							<div ref={bottomRef} />
						</div>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (input.trim()) {
									send(input.trim());
									setInput("");
								}
							}}
							className="flex items-center gap-2 border-t px-3 py-2"
						>
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Запитайте мене..."
								className="flex-1 rounded-md border px-2 py-1 text-sm focus:outline-none"
							/>
							<button
								type="submit"
								className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
								disabled={!input.trim() || !connected}
							>
								<Send size={16} />
							</button>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
