export type Vector = number[]

export type DocumentChunk = {
    id: string;
    text: string;
    embedding: Vector;
    metadata: {
        source: string;
    }
}
