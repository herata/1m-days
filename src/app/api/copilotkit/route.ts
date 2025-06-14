import {
	CopilotRuntime,
	GroqAdapter,
	copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import type { NextRequest } from "next/server";

const serviceAdapter = new GroqAdapter({
	model: "llama-3.1-8b-instant", // より安定したモデルに変更
	disableParallelToolCalls: true, // パラレルツールコールを無効化
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
