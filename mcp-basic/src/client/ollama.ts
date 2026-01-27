import fetch from "node-fetch";
import {loadPrompt} from "./prompt.js";
import {config} from "./config.js";
import type {JsonRpcRequest} from "./types/jsonrpc.js";

type OllamaResponse = {
    message?: {
        role: string;
        content: string;
    }
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
    });

    const response = await fetch(config.ollamaUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            model: config.ollamaModel,
            stream: false,
            messages: [
                {role: "system", content: prompt},
                {role: "user", content: userRequest}
            ]
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(
            `Ollama error (${response.status}): ${text || "no body"}`
        );
    }

    const data = (await response.json()) as OllamaResponse;

    const content = data.message?.content;

    if (!content || typeof content !== "string") {
        throw new Error("Ollama did not return chat content");
    }
    return parseJsonRpcRequest(content);
}
