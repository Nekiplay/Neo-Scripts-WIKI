---
icon: globe
---

# Http

## `create_server(host, port, request)`

Create HTTP server.

**Parameters:**
* `host` (string).
* `port` (number).
* `request` (function).

**Example Usage:**
```lua
local http = require("http")
local encoding = require("encoding")

local server = http.create_server(host, port, function(req)
    if req.path == "/" then
        return {
            status = 200,
            headers = { ["Content-Type"] = "text/html; charset=utf-8" },
            body = "<h1>Hello from Lua!</h1>"
        }
    end
end)
```

## `get(url, timeout)`

Send GET request.

**Parameters:**
* `url` (string).
* `timeout` (number).

**Example Usage:**
```lua
local http = require("http")
local encoding = require("encoding")
local response = encoding.bytesToString(http.get("http://ip-api.com/json/24.48.0.1", 5000), "UTF-8")
```

## `get_with_headers(url, headers)`

Send GET request with custom headers.

**Parameters:**
* `url` (string).
* `headers` (table).

**Example Usage:**
```lua
local headers = {["User-Agent"] = "LuaJ-HTTP-Client/1.0"}
local response = http.get_with_headers("http://example.com", headers)
```

## `get_async_with_headers_callback(url, headers, function(response, error))`

Send async GET request with callback.

**Parameters:**
* `url` (string).
* `headers` (table).
* `function` (function).

**Example Usage:**
```lua
local headers = {["User-Agent"] = "LuaJ-HTTP-Client/1.0"}
http.get_async_with_headers_callback("http://ip-api.com/json/88.88.88.88", headers, function(response, error)
    if error then
        print("Error:", error)
    else
        print("Got response")
    end
end)
```

## `post(url, headers, body)`

Send POST request with headers and body.

**Parameters:**
* `url` (string).
* `headers` (table).
* `body` (string).

**Example Usage:**
```lua
local http = require("http")
local response = http.post("https://api.example.com/data", {}, '{"key":"value"}')
```

## `post_with_headers(url, body)`

Send POST request with body.

**Parameters:**
* `url` (string).
* `body` (string).

**Example Usage:**
```lua
local http = require("http")
local response = http.post_with_headers("https://api.example.com/data", '{"key":"value"}')
```

## `post_async_with_headers_callback(url, headers, body, function(response, error))`

Send async POST request with callback.

**Parameters:**
* `url` (string).
* `headers` (table).
* `body` (string).
* `function` (function).

**Example Usage:**
```lua
local headers = {
    ['Authorization'] = 'Bearer YOUR_TOKEN',
    ['Content-Type'] = 'application/json'
}
local body = json.stringify({ model = "gpt-4", messages = {{role="user", content="Hello"}} })

http.post_async_with_headers_callback('https://api.openai.com/v1/chat/completions', headers, body, function(response, error)
    if error then
        print(error)
    else
        print("Got AI response")
    end
end)
```

## Proxy Methods

### `get_with_proxy(url, host, port, user, pass, timeout)`

Send GET request through proxy.

**Parameters:**
* `url` (string).
* `host` (string) - proxy host.
* `port` (number) - proxy port.
* `user` (string, optional) - proxy username.
* `pass` (string, optional) - proxy password.
* `timeout` (number, optional) - timeout in seconds (default 5).

**Example Usage:**
```lua
local response = http.get_with_proxy("http://example.com", "proxy.example.com", 8080, "user", "pass", 10)
```

### `get_with_headers_with_proxy(url, headers, host, port, user, pass)`

Send GET request with headers through proxy.

### `get_async_with_headers_with_proxy_callback(url, headers, host, port, user, pass, callback)`

Send async GET request with headers through proxy.

### `post_with_proxy(url, body, host, port, user, pass)`

Send POST request through proxy.

### `post_with_headers_with_proxy(url, body, headers, host, port, user, pass)`

Send POST request with headers through proxy.

### `post_async_with_headers_with_proxy_callback(url, body, headers, host, port, user, pass, callback)`

Send async POST request with headers through proxy.
