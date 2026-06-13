---
description: TCP connections library
icon: globe
---

# TCP

## `connect(ip, port, timeout)`

**Parameters:**

* `ip` (string).
* `port` (number)
* `timeout` (number)

**Return:**&#x20;

* number

**Example Usage:**

```lua
-- Connect to example.com on port 80
local tcp = require("tcp")
local connectionId = tcp.connect("example.com", 80, 5000)
```

## `sendBytes(connectionId, bytesTable)`

**Parameters:**

* `connectionId` (number).
* `bytesTable` (table)

**Return:**&#x20;

* boolean

**Example Usage:**

```lua
local tcp = require("tcp")
local connectionId = tcp.connect("example.com", 80, 5000)
if connectionId then
    local bytesTable = {}
    bytesTable[1] = 72  -- 'H'
    bytesTable[2] = 105 -- 'i'
    bytesTable[3] = 10  -- newline
    local success, sendError = tcp.sendBytes(connectionId, bytesTable)
    if success then
        print("✓ Bytes sent successfully")
    else
        print("✗ Send bytes failed: " .. sendError)
    end
end
```

## `receiveBytes(connectionId, timeout, size)`

**Parameters:**

* `connectionId` (number).
* `timeout` (number)
* `size` (number)

**Return:**&#x20;

* table

**Example Usage:**

```lua
local tcp = require("tcp")
local connectionId = tcp.connect("example.com", 80, 5000)
if connectionId then
    local bytesReceived, receiveError = tcp.receiveBytes(connectionId, 1000, 50)
    if bytesReceived then
        print("✓ Received " .. bytesReceived.length() .. " bytes")
        local data = encoding.bytesToString(bytesReceived, "UTF-8")
    else
        print("✗ Receive bytes failed: " .. receiveError)
    end
end
```

## `disconnect(connectionId)`

**Parameters:**

* `connectionId` (number).

**Return:**&#x20;

* boolean

**Example Usage:**

```lua
local tcp = require("tcp")
local connectionId = tcp.connect("example.com", 80, 5000)
if connectionId then
    local bytesReceived, receiveError = tcp.receiveBytes(connectionId, 1000, 50)
    if bytesReceived then
        print("✓ Received " .. bytesReceived.length() .. " bytes")
        local data = encoding.bytesToString(bytesReceived, "UTF-8")
    else
        print("✗ Receive bytes failed: " .. receiveError)
    end
    tcp.disconnect(connectionId)
end
```
