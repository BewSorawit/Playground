import { runClient } from "./client.js";

const userRequest = process.argv.slice(2).join(" ").trim();

if (!userRequest) {
    console.error("Usage: npm run client -- <request>");
    process.exit(1);
}

const response = await runClient(userRequest);

if (response) {
    console.log(JSON.stringify(response, null, 2));
}
