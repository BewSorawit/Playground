import { routeToRpc } from "./ollama.js";
import { callMcp } from "./mcp-client.js";
import type { JsonRpcResponse } from "./types/jsonrpc.js";
import { validateRpc } from "./validators/validateRpc.js";
import { readFile } from "node:fs/promises";

const TOOLS_DESCRIPTION_URL = new URL("./tools-description.md", import.meta.url);
let toolsDescriptionCache: string | null = null;

async function getToolsDescription(): Promise<string> {
    if (!toolsDescriptionCache) {
        toolsDescriptionCache = (await readFile(TOOLS_DESCRIPTION_URL, "utf8")).trim();
    }

    return toolsDescriptionCache;
}

export async function runClient(
    userRequest: string
): Promise<JsonRpcResponse | null> {
    const rpcRequest = await routeToRpc(userRequest, await getToolsDescription());
    validateRpc(rpcRequest);
    return callMcp(rpcRequest);
}
