import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";
import React, { type ReactNode } from "react";

const publicApiKey = process.env.NEXT_PUBLIC_COPILOT_API_KEY;

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<CopilotKit publicApiKey={publicApiKey} runtimeUrl="/api/copilotkit">
			{children}
		</CopilotKit>
	);
}
