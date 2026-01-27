import fetch from "node-fetch";
import { loadPrompt } from "./prompt.js";
import { config } from "./config.js";
import type { JsonRpcRequest } from "./types/jsonrpc.js";

type OllamaResponse = {
    response?: string;
};

function parseJsonRpcRequest(raw: string): JsonRpcRequest {
    let payload: unknown;
    try {
        payload = JSON.parse(raw);
    } catch (error) {
        throw new Error(`Invalid JSON from Ollama: ${String(error)}`);
    }

    if (
        !payload ||
        typeof payload !== "object" ||
        (payload as JsonRpcRequest).jsonrpc !== "2.0" ||
        typeof (payload as JsonRpcRequest).method !== "string"
    ) {
        throw new Error("Ollama response is not a valid JSON-RPC request");
    }

    return payload as JsonRpcRequest;
}

export async function routeToRpc(
    userRequest: string,
    toolsDescription: string
): Promise<JsonRpcRequest> {
    const prompt = loadPrompt("router", {
        TOOLS: toolsDescription,
        USER_REQUEST: userRequest,
    });

    const response = await fetch(config.ollamaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama3",
            prompt,
            stream: false,
            format: "json",
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(
            `Ollama error (${response.status}): ${text || "no body"}`
        );
    }

    const data = (await response.json()) as OllamaResponse;
    if (!data.response || typeof data.response !== "string") {
        throw new Error("Ollama did not return a response payload");
    }

    return parseJsonRpcRequest(data.response);
}
