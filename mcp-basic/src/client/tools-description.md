You must output a JSON-RPC 2.0 request.

Rules:
- params MUST be an object (named parameters), never an array
- Do NOT use positional arguments
- Only use the methods defined below
- Do NOT add extra fields

Methods:
- hello(params: { name: string })
- createUser(params: { name: string, email: string })
- logEvent(params: { event: string })

Output format example:
{
  "jsonrpc": "2.0",
  "id": "01",
  "method": "hello",
  "params": {
    "name": "brown"
  }
}
