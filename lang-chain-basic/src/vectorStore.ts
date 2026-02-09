import {DocumentChunk, Vector} from "./types";
import {HierarchicalNSW} from "hnswlib-node";

export class VectorStore {
    private index: HierarchicalNSW;
    private dim: number;
    private readonly _items: DocumentChunk[] = [];

    constructor(dim: number) {
        this.dim = dim;
        this.index = new HierarchicalNSW("cosine", dim);
        this.index.initIndex(10000, 16, 200, 42);
    }

    add(chunk: DocumentChunk) {
        const id = this.items.length;
        this._items.push(chunk);

        this.index.addPoint(chunk.embedding, id);
    }


    get items(): readonly DocumentChunk[] {
        return this._items;
    }

    search(query: Vector, k: number): DocumentChunk[] {
        const result = this.index.searchKnn(query,k);
        return result.neighbors.map(
            id=>this._items[id]
        );
    }
}