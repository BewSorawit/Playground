export type JsonRpcRequest = {
    jsonrpc: "2.0";
    method: string;
    params?: any;
    id?: string | number;
};

export type JsonRpcResponse = | {
    jsonrpc: "2.0",
    result: any;
    id: string | number;
} | {
    jsonrpc: "2.0",
    error: { code: number; message: string };
    id: string | number | null;
}