import {DocumentChunk, Vector} from "./types";

export class VectorStore {
    private readonly _items: DocumentChunk[] = []

    add(chunk: DocumentChunk) {
        this._items.push(chunk)
    }

    get items(): readonly DocumentChunk[] {
        return this._items;
    }

    search(query: Vector, k: number): DocumentChunk[] {
        return this._items.map(item => ({
            item,
            score: cosine(query, item.embedding)
        })).sort((a, b) => b.score - a.score)
            .slice(0, k)
            .map(x => x.item)
    }
}

function cosine(a: Vector, b: Vector): number {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] ** 2;
        nb += b[i] ** 2;
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
}