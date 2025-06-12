"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export function useChatWs(url: string) {
	const initialized = useRef(false);
	const wsRef = useRef<WebSocket | null>(null);

	const [messages, setMessages] = useState<Msg[]>([]);
	const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState(false);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;

		const ws = new WebSocket(url);
		wsRef.current = ws;

		ws.onopen = () => {
			console.log("✅ connected");
			setConnected(true);
		};

		ws.onerror = (err) => {
			console.error("⛔ websocket error", err);
		};

		ws.onclose = (e) => {
			console.log(`🔌 disconnected (code ${e.code}, reason: “${e.reason}”)`);
			setConnected(false);
			setTyping(false);
		};

		ws.onmessage = (e) => {
			const raw = JSON.parse(e.data) as Msg;

			setMessages((prev) => [...prev, raw]);
			if (raw.role === "assistant") {
				setTyping(false);
			}
		};

		// return () => ws.close();
	}, [url]);

	const send = (text: string) => {
		if (wsRef.current?.readyState !== WebSocket.OPEN) {
			console.warn("🔄 Socket still connecting...");
			return false;
		}

		wsRef.current.send(JSON.stringify({ role: "user", content: text }));
		setMessages((m) => [...m, { role: "user", content: text }]);
		setTyping(true);
		return true;
	};
	return { messages, send, connected, typing };
}
