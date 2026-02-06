import {Vector} from "./types";

export function embed(text: string): Vector {
    return [...text].map(c => c.codePointAt(0)! % 10);
}