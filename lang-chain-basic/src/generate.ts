export function buildPrompt(
    question: string,
    contexts: string[]
) {
    return `
Answer using only the context below.

Context:
${contexts.join("\n---\n")}

Question:
${question}
`;
}