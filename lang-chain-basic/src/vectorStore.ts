import {DocumentChunk} from "./types";

export class VectorStore {
    private readonly _items: DocumentChunk[] = []

    add(chunk: DocumentChunk) {
        this._items.push(chunk)
    }

    get items(): readonly DocumentChunk[] {
        return this._items;
    }
}