export function chunkText(text: string, chunkSize: number): string[] {
    const words = text.split(" ")
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(" "));
    }
    return chunks
}