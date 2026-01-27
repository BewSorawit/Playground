import { requireEnv } from "../config/env.js";

export const config = {
    ollamaUrl: requireEnv("OLLAMA_URL"),
    mcpServerUrl: requireEnv("MCP_SERVER_URL"),
};
