import {createServer} from "node:http";

import {handleBatch, handleRpc} from "./rpc/index.js";
import type {JsonRpcRequest} from "./types/index.js";
import { config } from "./config.js";

const index = createServer(async (req, res) => {
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

        const response = Array.isArray(payload)
            ? handleBatch(payload as JsonRpcRequest[])
            : handleRpc(payload as JsonRpcRequest);

        if (!response) {
            res.end()
            return;
        }

        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(response))
    })
})

index.listen(config.port, () => {
    console.log(`MCP index running on port ${config.port}`)
})
