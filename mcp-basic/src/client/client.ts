import { routeToRpc } from "./ollama.js";
import { callMcp } from "./mcp-client.js";
import type { JsonRpcResponse } from "./types/jsonrpc.js";
import {validateRpc} from "./validators/validateRpc.js";

const TOOLS_DESCRIPTION = `
- createUser(name:string, email:string)
- logEvent(event:string)
- hello(name:string)
`.trim();

export async function runClient(
    userRequest: string
): Promise<JsonRpcResponse | null> {
    const rpcRequest = await routeToRpc(userRequest, TOOLS_DESCRIPTION);
    validateRpc(rpcRequest);
    return callMcp(rpcRequest);
}
