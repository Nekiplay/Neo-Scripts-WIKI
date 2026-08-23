---
description: Network functions
icon: wifi
---

# Network

### `getPlayersList()`

Get players list.

**Returns:**

* (table) Return list players.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local list = player.network.getPlayersList()
for index, pl in pairs(list) do
    if pl.name then
        player.addMessage(pl.name)
    end
    if pl.display_name then
        player.addMessage(pl.display_name)
    end
    player.addMessage(tostring(pl.latency))
    if pl.id then
        player.addMessage(tostring(pl.id))
    end
    if pl.gamemode then
        player.addMessage(pl.gamemode)
    end
    if pl.skin_texture then
        player.addMessage(pl.skin_texture)
    end
end
```

### `connectToServer(host, port)`

Connect to server.

**Parameters:**

* `host` (string).
* `port` (number).

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.network.connectToServer("mc.hypixel.net", 25565)
```


### `disconnectFromServer(reason)`

Disconnect from server.

**Parameters:**

* `reason` (string).

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.network.disconnectFromServer("Macros shedule")
```


### `sendStartDestroyBlockPacket(x, y, z, direction)`

Send block breaking packet.

**Parameters:**

* `x` (number).
* `y` (number).
* `z` (number).
* `direction` (string) `UP`, `DOWN`, `NORTH`, `SOUTH`, `WEST`, `EAST`

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.network.sendStartDestroyBlockPacket(0, 0, 0, "DOWN")
```


### `sendStopDestroyBlockPacket(x, y, z, direction)`

Send block stop breaking packet.

**Parameters:**

* `x` (number).
* `y` (number).
* `z` (number).
* `direction` (string) `UP`, `DOWN`, `NORTH`, `SOUTH`, `WEST`, `EAST`

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.network.sendStopDestroyBlockPacket(0, 0, 0, "DOWN")
```


### `sendStopAbortBlockPacket(x, y, z, direction)`

Send cancel block breaking packet.

**Parameters:**

* `x` (number).
* `y` (number).
* `z` (number).
* `direction` (string) `UP`, `DOWN`, `NORTH`, `SOUTH`, `WEST`, `EAST`

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.network.sendAbortBlockPacket(0, 0, 0, "DOWN")
```


### `sendAbortDestroyBlockPacket(x, y, z, direction)`

Send block abort breaking packet. Aborts the current block breaking action.

**Parameters:**

* `x` (number).
* `y` (number).
* `z` (number).
* `direction` (string) `UP`, `DOWN`, `NORTH`, `SOUTH`, `WEST`, `EAST`

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.network.sendAbortDestroyBlockPacket(0, 0, 0, "DOWN")
```


