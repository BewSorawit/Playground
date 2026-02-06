import {VectorStore} from "./vectorStore";
import {ingest} from "./ingest";

const store: VectorStore = new VectorStore();

ingest(store, {
    source: "doc-1",
    text: `
Circuit breaker is a design pattern used in microservices.
It prevents cascading failure by stopping requests to failing services.
Timeout and retry should be used together with circuit breaker.
`
})



