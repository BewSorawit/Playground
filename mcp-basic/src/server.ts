import {createServer} from "node:http";

import type {JsonRpcRequest, JsonRpcResponse} from "./types/types.js";
import {tools} from "./tools/tools.js";


const server = createServer(async (req, res) => {
    if (req.method !== "POST") {
        res.writeHead(405);
        return res.end();
    }
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
        const rpc: JsonRpcRequest = JSON.parse(body);
        console.log(rpc)

        const tool = tools[rpc.method];
        console.log(tool)
        if (!tool) {
            if (rpc.id === undefined) {
                res.end();
                return;
            }

            const error: JsonRpcResponse = {
                jsonrpc: "2.0",
                error: {
                    code: -32601,
                    message: "Method not found"
                },
                id: rpc.id,
            };

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(error));
            return;
        }
        const result = tool(rpc.params)
        console.log(result)
        if (rpc.id === undefined) {
            res.end()
            return;
        }

        const response: JsonRpcResponse = {
            jsonrpc: "2.0",
            result,
            id: rpc.id
        }
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(response))
    })
})


server.listen(3000, () => {
    console.log("MCP server running on port 3000")
})