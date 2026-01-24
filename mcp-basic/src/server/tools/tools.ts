type ToolFn = (params: any) => any;

export const tools: Record<string, ToolFn> = {
    createUser: ({name, email} = {}) => {
        return {
            id: 123,
            name,
            email,
        };
    },
    logEvent: ({event}) => {
        console.log("[EVENT]", event);
    },
    hello: ({name}) => {
        return `Hello ${name}!`;
    }
}