import type {JsonRpcRequest, JsonRpcResponse} from "../types/jsonrpc.js";
import {tools} from "../tools/tools.js";

export function handleRpc(rpc: JsonRpcRequest): JsonRpcResponse | null {
    const tool = tools[rpc.method];

    if (!tool) {
        if (rpc.id === undefined) {
            return null;
        }
        return {
            jsonrpc: "2.0",
            error: {
                code: -32601,
                message: "Method not found"
            },
            id: rpc.id
        }
    }

    const result = tool(rpc.params)
    if (rpc.id === undefined) {
        return null;
    }
    return {
        jsonrpc: "2.0",
        result,
        id: rpc.id
    }
}