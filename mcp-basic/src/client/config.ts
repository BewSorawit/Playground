import { requireEnv } from "../config/env.js";

export const config = {
    ollamaUrl: requireEnv("OLLAMA_URL"),
    ollamaModel: requireEnv("OLLAMA_MODEL"),
    mcpServerUrl: requireEnv("MCP_SERVER_URL"),
};
