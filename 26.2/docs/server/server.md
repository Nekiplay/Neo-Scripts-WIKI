---
icon: network-wired
---

# Server

Server object. Loaded with `require("server")`.

**Example Usage:**

```lua
local server = require("server")
```

## `getLevel(identifier)`

Returns a world (level) object by dimension identifier.

**Parameters:**

* `identifier` (string) - Dimension id, example: `minecraft:overworld`, `minecraft:the_nether`, `minecraft:the_end`. Default is `minecraft:overworld`.

**Returns:**

* ([World](/server/world.md)) World object or `nil` if the level is not loaded.

**Example Usage:**

```lua
local server = require("server")
local overworld = server.getLevel("minecraft:overworld")
local nether = server.getLevel("minecraft:the_nether")
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
