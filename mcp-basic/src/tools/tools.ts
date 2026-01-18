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
        console.log("event", event);
    },
    hello: function hello(name: string) {
        return "hi" + name
    }
}