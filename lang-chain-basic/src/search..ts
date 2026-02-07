import {VectorStore} from "./vectorStore";
import {embed} from "./embedding";

export function retrieve(store: VectorStore, question: string) {
    const qVec = embed(question);
    return store.search(qVec, 3);
}