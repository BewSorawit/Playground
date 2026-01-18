const batchedRpc = [
    {
        "jsonrpc": "2.0",
        "method": "createUser",
        "params": {"name": "A", "email": "a@mail.com"},
        "id": 1
    },
    {
        "jsonrpc": "2.0",
        "method": "createUser",
        "params": {"name": "B", "email": "b@mail.com"},
        "id": 2
    },
    {
        "jsonrpc": "2.0",
        "method": "createUser",
        "params": {"name": "C", "email": "c@mail.com"}
    }
]

fetch("http://localhost:3000", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(batchedRpc),
})
    .then(res => res.json())
    .then(data => {
        console.log("Batch response:", data);
    })
    .catch(console.error);
