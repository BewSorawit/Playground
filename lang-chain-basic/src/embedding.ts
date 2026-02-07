import {Vector} from "./types";

const DIM = 128;

function hash(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h * 31 + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
}

export function embed(text: string): Vector {
    const vec = new Array(DIM).fill(0);

    for (const word of text.toLowerCase().split(/\W+/).filter(Boolean)) {
        const h = hash(word) % DIM;
        vec[h] += 1;
    }

    return vec;
}