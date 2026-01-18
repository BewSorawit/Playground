const rpc = {
    jsonrpc: "2.0",
    method: "createUser",
    params: {
        name: "brown",
        email: "brown@gmail.com"
    },
    id: "test-1"
};

fetch("http://localhost:3000", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(rpc),
})
    .then((res) => res.json())
    .then((data) => {
        console.log("RPC response:", data);
    }).catch(console.error)