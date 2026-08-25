---
icon: network-wired
---

# Server

Server object. Loaded with `require("server")`.

**Example Usage:**

```lua
local server = require("server")
```

## `getLevel(identifier)` / `getWorld(identifier)`

Returns a world (level) object by dimension identifier. `getWorld` is an alias for `getLevel`.

**Parameters:**

* `identifier` (string) - Dimension id, example: `minecraft:overworld`, `minecraft:the_nether`, `minecraft:the_end`. Default is `minecraft:overworld`.

**Returns:**

* ([World](/server/world.md)) World object or `nil` if the level is not loaded.

**Example Usage:**

```lua
local server = require("server")
local overworld = server.getLevel("minecraft:overworld")
local nether = server.getWorld("minecraft:the_nether")
```

## `getLevels()` / `getWorlds()`

Returns a list of all loaded levels (dimensions) on the server.

**Returns:**

* (table) List of [world](/server/world.md) objects.

**Example Usage:**

```lua
local server = require("server")
for index, world in ipairs(server.getLevels()) do
    print(world.getDimension())
end
```

## `getOnlinePlayers()`

Returns a list of all online players.

**Returns:**

* table ([List of entities](/common/datatypes/entity.md)) Return table (list) of players.

**Example Usage:**

```lua
local server = require("server")
local players = server.getOnlinePlayers()
for index, player in ipairs(players) do
    print(string.format("Player %d: %s", index, player.name))
end
```

## `getPlayer(nameOrUuid)`

Finds an online player by name (case-insensitive) or UUID.

**Parameters:**

* `nameOrUuid` (string) - Player name or UUID string.

**Returns:**

* ([Entity](/common/datatypes/entity.md)) Player or `nil` if not found.

**Example Usage:**

```lua
local server = require("server")
local player = server.getPlayer("Neki_play")
if player then
    print(player.name .. " is online")
end
```

## `broadcast(message)`

Sends a message to all players.

**Parameters:**

* `message` (string or component) - Message text.

**Returns:**

* (boolean) `true` if the message was sent.

**Example Usage:**

```lua
local server = require("server")
server.broadcast("Server restart in 1 minute!")
```

## `executeCommand(command [, x, y, z])` / `server.runCommand(...)`

Executes a server command as the console with full operator permissions (`PermissionSet.ALL_PERMISSIONS`). Command output is suppressed. The leading `/` is optional.

**Parameters:**

* `command` (string) - Server command without the leading slash.
* `x`, `y`, `z` (number) - Optional. Reference position for relative coordinates (`~`).

**Returns:**

* Multiple values:
  * Result:
    * ([Entity](/common/datatypes/entity.md)) - If the command spawned exactly one entity (for example `summon`).
    * table ([List of entities](/common/datatypes/entity.md)) - If several entities were spawned.
    * boolean `true` - If no new entities were detected.
    * boolean `false` - If command execution failed.
  * (number) - Numeric result of the command or `nil`.
  * (string) - Error message if execution failed, otherwise `nil`.

**Example Usage:**

```lua
local server = require("server")

local pig = server.executeCommand("summon minecraft:pig ~ ~ ~")
if pig then
    print("Spawned: " .. pig.name)
end

local ok = server.executeCommand("time set day")
```

## `schedule(ticks, callback)`

Calls the function after the given amount of ticks (1 tick = 50 ms). The callback runs on the main server thread.

**Parameters:**

* `ticks` (number) - Delay in ticks.
* `callback` (function)

**Returns:**

* (boolean) Always `true`.

**Example Usage:**

```lua
local server = require("server")

schedule(100, function()
    server.broadcast("5 seconds passed!")
end)
```

## `runTask(callback)`

Runs the function on the main server thread. Useful from other threads (see [threads](/common/libs/threads.md)).

**Parameters:**

* `callback` (function)

**Example Usage:**

```lua
local threads = require("threads")

threads.createThread(function()
    -- heavy work off-thread
    runTask(function()
        print("Back on the main thread")
    end)
end)
```

## `getTps()`

Returns the current server TPS (max `20`).

**Returns:**

* (number) Server TPS.

**Example Usage:**

```lua
print("TPS: " .. string.format("%.1f", getTps()))
```

## `getMspt()`

Returns the average time per tick in milliseconds.

**Returns:**

* (number) Milliseconds per tick.

**Example Usage:**

```lua
print("MSPT: " .. string.format("%.2f", getMspt()))
```

## `gameRule(name [, value])`

Reads or writes a gamerule by its vanilla name.

**Parameters:**

* `name` (string) - Gamerule name, example: `keepInventory`, `randomTickSpeed`.
* `value` (boolean/number/string) - Optional. New value. If omitted, returns the current value.

**Returns:**

* Current value on read; new value as a string on write. `false` for unsupported types.

**Example Usage:**

```lua
local server = require("server")
print(server.gameRule("keepInventory"))
server.gameRule("keepInventory", true)
server.gameRule("randomTickSpeed", 0)
```

## `difficulty([value])`

Reads or sets the world difficulty.

**Parameters:**

* `value` (string or number) - Optional. `"peaceful"` | `"easy"` | `"normal"` | `"hard"`, or id `0-3`. If omitted, returns the current difficulty.

**Returns:**

* (string) Difficulty name.

**Example Usage:**

```lua
local server = require("server")
print(server.difficulty())
server.difficulty("hard")
```

## `saveAll()`

Saves the world and all player data synchronously.

**Returns:**

* (boolean) `true` on success.

**Example Usage:**

```lua
if saveAll() then
    print("World saved")
end
```

## `stop()`

Stops the server (vanilla shutdown path with saving). Use with care — usually bound to admin commands only.

**Example Usage:**

```lua
stop()
```
