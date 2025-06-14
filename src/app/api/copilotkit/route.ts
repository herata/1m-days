import {
	CopilotRuntime,
	GroqAdapter,
	copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import type { NextRequest } from "next/server";

const serviceAdapter = new GroqAdapter({
	model: "llama-3.3-70b-versatile",
});

const runtime = new CopilotRuntime({
	actions: [],
});

export const POST = async (req: NextRequest) => {
	const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
		runtime,
		serviceAdapter,
		endpoint: "/api/copilotkit",
	});

	return handleRequest(req);
};
