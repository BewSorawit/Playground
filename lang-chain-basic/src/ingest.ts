import {VectorStore} from "./vectorStore";
import {chunkText} from "./chunk";
import {embed} from "./embedding";

export function ingest(store: VectorStore, doc: { source: string, text: string }) {
    const chunks: string[] = chunkText(doc.text, 5);
    chunks.forEach((text, i) => {
        store.add({
            id: `${i}`,
            text,
            embedding: embed(text),
            metadata: {source: doc.source}
        });
    });
}