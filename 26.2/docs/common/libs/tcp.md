---
description: TCP connections library
icon: globe
---

# TCP

## Connecting

### `connect(ip, port, timeout)`

Connect to a TCP server.

**Parameters:**
* `ip` (string).
* `port` (number).
* `timeout` (number) - connection timeout in ms (default 5000).

**Return:** 
* connectionId (number), error

**Example Usage:**
```lua
local tcp = require("tcp")
local connectionId, err = tcp.connect("example.com", 80, 5000)
if connectionId then
    print("Connected:", connectionId)
end
```

## Sending Data

### `send(connectionId, message, newline)`

Send text data.

**Parameters:**
* `connectionId` (number).
* `message` (string).
* `newline` (boolean, optional) - append newline (default true).

**Return:** 
* success (boolean), error

**Example Usage:**
```lua
tcp.send(connectionId, "Hello Server!")
```

### `sendBytes(connectionId, bytesTable)`

Send raw bytes.

**Parameters:**
* `connectionId` (number).
* `bytesTable` (table) - table of byte values (0-255).

**Return:** 
* success (boolean), error

**Example Usage:**
```lua
local bytes = {72, 105, 10} -- "Hi\n"
local success, err = tcp.sendBytes(connectionId, bytes)
```

## Receiving Data

### `receive(connectionId, timeout)`

Receive text data (reads a line).

**Parameters:**
* `connectionId` (number).
* `timeout` (number, optional) - timeout in ms (-1 for no timeout).

**Return:** 
* text (string), error

**Example Usage:**
```lua
local data, err = tcp.receive(connectionId, 1000)
if data then
    print("Received:", data)
end
```

### `receiveBytes(connectionId, timeout, size)`

Receive raw bytes.

**Parameters:**
* `connectionId` (number).
* `timeout` (number, optional) - timeout in ms.
* `size` (number, optional) - max bytes to read (default 1024).

**Return:** 
* bytesTable (table), error

**Example Usage:**
```lua
local bytes, err = tcp.receiveBytes(connectionId, 1000, 50)
if bytes then
    print("Received", #bytes, "bytes")
end
```

## Connection Management

### `disconnect(connectionId)`

Disconnect.

**Parameters:**
* `connectionId` (number).

**Return:** 
* boolean

### `isConnected(connectionId)`

Check if connection is active.

**Parameters:**
* `connectionId` (number).

**Return:** 
* boolean

### `setBlocking(connectionId, blocking)`

Set blocking mode.

**Parameters:**
* `connectionId` (number).
* `blocking` (boolean).

### `setTimeout(connectionId, timeout)`

Set socket timeout.

**Parameters:**
* `connectionId` (number).
* `timeout` (number) - timeout in ms.

### `getLocalAddress(connectionId)`

Get local address info.

**Parameters:**
* `connectionId` (number).

**Return:** 
* table ({address, port})

### `getRemoteAddress(connectionId)`

Get remote address info.

**Parameters:**
* `connectionId` (number).

**Return:** 
* table ({address, port})

### `getSocketCount()`

Get number of open connections.

**Return:** 
* number

## Server Methods

### `listen(port, host, backlog)`

Start a TCP server.

**Parameters:**
* `port` (number).
* `host` (string, optional) - default "0.0.0.0".
* `backlog` (number, optional) - default 50.

**Return:** 
* serverId (number), error

### `accept(serverId, timeout)`

Accept a new connection.

**Parameters:**
* `serverId` (number).
* `timeout` (number, optional) - 0 = infinite wait.

**Return:** 
* connectionId (number), error

### `closeServer(serverId)`

Close a TCP server.

**Parameters:**
* `serverId` (number).

**Return:** 
* boolean

## Complete Example

```lua
local tcp = require("tcp")
local encoding = require("encoding")

-- Connect
local conn, err = tcp.connect("example.com", 80, 5000)
if not conn then
    print("Failed:", err)
    return
end

-- Send HTTP request
local request = "GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n"
tcp.sendBytes(conn, encoding.stringToBytes(request, "UTF-8"))

-- Receive response
local response, recvErr = tcp.receiveBytes(conn, 3000, 4096)
if response then
    local text = encoding.bytesToString(response, "UTF-8")
    print(text)
end

-- Cleanup
tcp.disconnect(conn)
```
