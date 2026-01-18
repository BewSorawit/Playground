import {createServer} from "node:http";

import {handleBatch, handleRpc} from "./rpc/index.js";
import type {JsonRpcRequest} from "./types/index.js";

const server = createServer(async (req, res) => {
    if (req.method !== "POST") {
        res.writeHead(405);
        return res.end();
    }
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
        let payload: unknown;

        try {
            payload = JSON.parse(body);
        } catch {
            res.writeHead(400);
            return res.end();
        }

        const response = Array.isArray(payload) ? handleBatch(payload as JsonRpcRequest[]) : handleRpc(payload as JsonRpcRequest);

        if (!response) {
            res.end()
            return;
        }

        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(response))
    })
})

server.listen(3000, () => {
    console.log("MCP server running on port 3000")
})