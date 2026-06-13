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
-- Example code showing how to use the function
local http = require("http")
local encoding = require("encoding")

local server = http.create_server(host, port, function(req)
    -- Главная страница (HTML)
    if req.path == "/" or req.path == "/index.html" then
        local html = [[
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Lua HTTP Server</title>
    <style>
        body { font-family: sans-serif; text-align: center; margin-top: 50px; }
        button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Hello from Lua HTTP-server!</h1>
    <p>This page and the script below are loaded directly from Lua.</p>
    <button id="actionBtn">Нажми меня</button>

    <!-- Let's include our JavaScript script -->
    <script src="/app.js"></script>
</body>
</html>
        ]]
        
        return {
            status = 200,
            headers = {
                ["Content-Type"] = "text/html; charset=utf-8"
            },
            body = encoding.stringToBytes(html, "UTF-8")
        }

    -- JS Скрипт
    elseif req.path == "/app.js" then
        local js = [[
console.log("JavaScript файл успешно загружен!");

document.getElementById("actionBtn").addEventListener("click", function() {
    alert("Кнопка нажата! JavaScript, отправленный сервером Lua, работает.");
});
        ]]
        
        return {
            status = 200,
            headers = {
                ["Content-Type"] = "application/javascript; charset=utf-8"
            },
            body = js
        }

    -- Любой другой путь (404 Not Found)
    else
        return {
            status = 404,
            headers = {
                ["Content-Type"] = "text/plain; charset=utf-8"
            },
            body = encoding.stringToBytes("Ошибка 404: Страница не найдена", "UTF-8")
        }
    end
end)
```

## `get(url, timeout)`

Send get request.

**Parameters:**

* `url` (string).
* `timeout` (number).

**Example Usage:**

```lua
-- Example code showing how to use the function
local http = require("http")
local encoding = require("encoding")
local json = require("json")
local player = require("player")

local response = encoding.bytesToString(http.get("http://ip-api.com/json/24.48.0.1", 5000), "UTF-8")
local js = json.parse(response)
player.addMessage(js.country)
```

## `get_with_headers(url, headers)`

Send get request.

**Parameters:**

* `url` (string).
* `headers` (table).

**Example Usage:**

```lua
-- Example code showing how to use the function
local http = require("http")
local encoding = require("encoding")
local json = require("json")
local player = require("player")

local headers = {["User-Agent"] = "LuaJ-HTTP-Client/1.0"}
local response = encoding.bytesToString(http.get_with_headers("http://ip-api.com/json/24.48.0.1", headers), "UTF-8")
local js = json.parse(response)
player.addMessage(js.country)
```

## `get_async_with_headers_callback(url, headers, function(response, error))`

Send async get request.

**Parameters:**

* `url` (string).
* `headers` (table).
* `function` (function).

**Example Usage:**

```lua
-- Example code showing how to use the function
local http = require("http")
local encoding = require("encoding")
local json = require("json")
local player = require("player")

local headers = {["User-Agent"] = "LuaJ-HTTP-Client/1.0"}
http.get_async_with_headers_callback("http://ip-api.com/json/88.88.88.88", headers, function(response, error)
    if error then
        print("Error:", error)
    else
        local js = encoding.bytesToString(json.parse(response), "UTF-8")
        player.addMessage(js.country)
    end
end)
```

## `post_async_with_headers_callback(url, headers, json_body, function(response, error))`

Send async post request.

**Parameters:**

* `url` (string).
* `headers` (table).
* `json_body` (string).
* `function` (function).

**Example Usage:**

```lua
local headers = {
    ['Authorization'] = 'Bearer ',
    ['HTTP-Referer'] = 'https://github.com/Nekiplay/Hypixel-Cry',
    ['X-Title'] = 'Hypixel Cry',
    ['Content-Type'] = 'application/json'
}

local body_data = {
    model = 'glm-4.7-flash',
	stream = false,
    messages = {
		{
			role = "user",
			content = "Hello"
		}
	}
}

local http = require("http")
local encoding = require("encoding")
local json = require("json")
local player = require("player")

local json_body = json.stringify(body_data)

http.post_async_with_headers_callback(
    'https://api.z.ai/api/paas/v4/chat/completions',
    headers,
    json_body,
    function(response, error)
        if error then
            player.addMessage(error)
        else
			print(response)
            local result = encoding.bytesToString(json.parse(response), "UTF-8")
            player.addMessage("AI response: '" .. result.choices[1].message.content .. "'")
        end
    end
)
```
