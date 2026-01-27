import { resolve, dirname } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PROMPT_DIR = resolve(__dirname, "prompts");

export function loadPrompt(
    name: string,
    variables: Record<string, string>
): string {
    const filePath = resolve(PROMPT_DIR, `${name}.txt`);
    let template = readFileSync(filePath, "utf-8");

    for (const [key, value] of Object.entries(variables)) {
        template = template.replaceAll(`{{${key}}}`, value);
    }

    return template;
}