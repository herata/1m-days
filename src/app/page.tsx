"use client";

import { CopilotChat } from "@copilotkit/react-ui";

export default function CopilotChatPage() {
	return (
		<div className="h-screen w-screen">
			<CopilotChat
				labels={{
					title: "Chat Assistant",
					initial: "👋 Hello! I'm your AI assistant. How can I help you today?",
				}}
				instructions="You are a helpful AI assistant. Be friendly, concise, and helpful in your responses."
				className="h-full"
			/>
		</div>
	);
}
