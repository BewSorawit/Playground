import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..", "..");
const rootEnv = resolve(rootDir, ".env");
const legacyClientEnv = resolve(rootDir, "src", "client", ".env");

const envPath = existsSync(rootEnv) ? rootEnv : legacyClientEnv;
dotenv.config({ path: envPath });

export function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing env variable ${name}`);
    }
    return value;
}

export function numberEnv(name: string, fallback: number): number {
    const raw = process.env[name];
    if (raw === undefined || raw === "") {
        return fallback;
    }
    const value = Number(raw);
    if (!Number.isFinite(value)) {
        throw new Error(`Invalid number for env variable ${name}`);
    }
    return value;
}
