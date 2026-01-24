import { numberEnv } from "../config/env.js";

export const config = {
    port: numberEnv("PORT", 3000),
};
