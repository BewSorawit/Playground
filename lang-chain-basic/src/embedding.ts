import {Vector} from "./types";

const DIM = 64;

function normalize(v: number[]) {
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
    return v.map(x => x / norm);
}

export function embed(text: string): Vector {
    const vec = new Array(DIM).fill(0);

    const t = text.toLowerCase();

    for (let i = 0; i < t.length; i++) {
        const code = t.charCodeAt(i);
        vec[code % DIM] += 1;
    }

    return normalize(vec);
}