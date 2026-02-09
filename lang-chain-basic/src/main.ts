import {VectorStore} from "./vectorStore";
import {ingest} from "./ingest";
import {buildPrompt} from "./generate";
import {retrieve} from "./search.";

const store: VectorStore = new VectorStore(64);

ingest(store, {
    source: "doc-1",
    text: `a
Circuit breaker is a design pattern used in microservices.
It prevents cascading failure by stopping requests to failing services.
Timeout and retry should be used together with circuit breaker.
`
});

const question = "How to prevent cascading failure in microservice?";
const results = retrieve(store, question)

const prompt = buildPrompt(question, results.map(r => r.text))

console.log(prompt)