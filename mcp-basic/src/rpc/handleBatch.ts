import type {JsonRpcRequest, JsonRpcResponse} from "../types/jsonrpc.js";
import {handleRpc} from "./handleRpc.js";

export function handleBatch(batch: JsonRpcRequest[]): JsonRpcResponse[] | null {
    if (batch.length === 0) {
        return [
            {
                jsonrpc: "2.0",
                error: {
                    code: -32600,
                    message: "Invalid Request"
                },
                id: null
            }
        ]
    }

    const responses = batch.map(handleRpc).filter((r): r is JsonRpcResponse => r !== null);
    return responses.length === 0 ? null : responses;
}