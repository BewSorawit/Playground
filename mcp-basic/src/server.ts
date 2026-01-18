import {createServer} from "node:http";

import {handleRpc} from "./rpc/index.js";
import type {JsonRpcRequest} from "./types/jsonrpc.js";


const server = createServer(async (req, res) => {
    if (req.method !== "POST") {
        res.writeHead(405);
        return res.end();
    }
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
        const rpc: JsonRpcRequest = JSON.parse(body);

        const response = handleRpc(rpc);

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