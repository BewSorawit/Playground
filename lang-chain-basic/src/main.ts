import {VectorStore} from "./vectorStore";
import {ingest} from "./ingest";
import {retrieve} from "./search.";

const store: VectorStore = new VectorStore();

ingest(store, {
    source: "doc-1",
    text: `a
Circuit breaker is a design pattern used in microservices.
It prevents cascading failure by stopping requests to failing services.
Timeout and retry should be used together with circuit breaker.
`
});



const question = "How to prevent cascading failure in microservice?";
const results = retrieve(store,question)

console.log(results)