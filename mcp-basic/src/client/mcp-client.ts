import fetch from "node-fetch";
import { config } from "./config.js";
import type { JsonRpcRequest, JsonRpcResponse } from "./types/jsonrpc.js";

export async function callMcp(
    request: JsonRpcRequest
): Promise<JsonRpcResponse | null> {
    const response = await fetch(config.mcpServerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(
            `MCP server error (${response.status}): ${text || "no body"}`
        );
    }

    if (request.id === undefined) {
        return null;
    }

    const payload = (await response.json()) as JsonRpcResponse;
    return payload;
}
