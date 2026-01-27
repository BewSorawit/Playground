import type {JsonRpcRequest} from "../types/jsonrpc.js";

const ALLOWED_METHODS = {
    createUser: ["name", "email"],
    logEvent: ["event"],
    hello: ["name"],
};

export function validateRpc(rpc: JsonRpcRequest): JsonRpcRequest {
    const spec = ALLOWED_METHODS[rpc.method as keyof typeof ALLOWED_METHODS];
    if (!spec) {
        throw new Error(`Unknown method: ${rpc.method}`);
    }

    if (rpc.params && typeof rpc.params !== "object") {
        throw new Error("params must be an object");
    }

    for (const key of Object.keys(rpc.params ?? {})) {
        if (!spec.includes(key)) {
            throw new Error(`Unexpected param: ${key}`);
        }
    }

    return rpc;
}