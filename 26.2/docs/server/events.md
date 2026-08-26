---
icon: bell
---

# Events

## Registration Functions

### `registerUnloadCallback(function)`

Registers a callback when the script is unloaded.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerUnloadCallback(function()
    print("Script unloaded")
end)
```

### `registerServerTick(function)`

Registers a post-tick handler for the whole server. Alias of `registerServerTickPost`.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
local tick = 0
registerServerTick(function()
    tick = tick + 1
end)
```

### `registerServerTickPre(function)`

Registers a pre-tick handler for the whole server.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerServerTickPre(function()
    -- runs before main tick
end)
```

### `registerServerTickPost(function)`

Registers a post-tick handler for the whole server.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerServerTickPost(function()
    -- runs after main tick
end)
```

### `registerServerWorldTick(function(world))`

Registers a pre-tick handler for each world (level). Alias of `registerServerWorldTickPre`.

**Parameters:**
* `function` (function ([World](/server/world.md))).

**Example Usage:**
```lua
registerServerWorldTick(function(world)
    print(world.getDimension())
end)
```

### `registerServerWorldTickPre(function(world))`

Registers a pre-tick handler for each world (level).

**Parameters:**
* `function` (function ([World](/server/world.md))).

**Example Usage:**
```lua
registerServerWorldTickPre(function(world)
    -- runs before main world tick
end)
```

### `registerServerWorldTickPost(function(world))`

Registers a post-tick handler for each world (level).

**Parameters:**
* `function` (function ([World](/server/world.md))).

**Example Usage:**
```lua
registerServerWorldTickPost(function(world)
    -- runs after main world tick
end)
```

### `registerServerStoppingCallback(function(world))`

Registers a callback that fires when the server (or world) is shutting down, **before** the worlds are unloaded - all levels are still loaded and accessible. Called once per loaded world.

Also unregistered with `unregisterServerStoppingCallback`.

**Parameters:**
* `function` (function ([World](/server/world.md))).

**Example Usage:**
```lua
registerServerStoppingCallback(function(world)
    print("Shutting down " .. world.getDimension() .. ", saving state...")
end)

registerUnloadCallback(function()
    print("Script unloaded")
end)
```

### `registerServerStartedCallback(function)`

Registers a callback that fires once after the server has **fully started** - all worlds are loaded and autoload scripts have been executed. Also unregistered with `unregisterServerStartedCallback`.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerServerStartedCallback(function()
    print("Server is fully loaded!")
end)
```

### `registerWorldLoadedCallback(function(world))`

Registers a callback that fires when a world (level) is fully loaded. Called once for every dimension right after the server has fully started.

Also unregistered with `unregisterWorldLoadedCallback`.

**Parameters:**
* `function` (function ([World](/server/world.md))).

**Example Usage:**
```lua
registerWorldLoadedCallback(function(world)
    print("World loaded: " .. world.getDimension())
end)
```

### `registerSluaInvokeCallback(function(info))`

Registers a callback that fires when this script is started through the `/slua load` or `/slua toggle` command.

Also unregistered with `unregisterSluaInvokeCallback`.

**Parameters:**
* `function` (function (info)).
  * `info` (table).
    * `command` (string) - `"load"` or `"toggle"`.
    * `was_loaded` (boolean) - for `load`: whether the script was restarted (was already loaded).
    * `executor` (string) - name of the source that ran the command.

**Example Usage:**
```lua
registerSluaInvokeCallback(function(info)
    print("Invoked via /slua " .. info.command .. " by " .. info.executor)
end)
```

---

## Interaction Callbacks

All interaction callbacks receive a single table argument with event data.

Common table fields:

* `player` ([entity](/common/datatypes/entity.md)) - Player who triggered the event.
* `world` ([World](/server/world.md)) - World where the event happened.
* `hand` (string) - `MAIN_HAND` or `OFF_HAND` (if present).

Cancellable callbacks stop the action when returning `false`.

### `registerAttackBlockCallback(function(table))`

Registers a block attack (left click) event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `hand`, `blockpos` ([BlockPos](/common/datatypes/blockPos.md)), `direction` ([Direction](/common/datatypes/direction.md)).

**Example Usage:**
```lua
registerAttackBlockCallback(function(data)
    print("Attacked block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
    return true -- return false to cancel
end)
```

### `registerUseBlockCallback(function(table))`

Registers a block use event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `hand`, `blockpos`, `direction`.

**Example Usage:**
```lua
registerUseBlockCallback(function(data)
    print("Used block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
    return true -- return false to cancel
end)
```

### `registerUseItemOnBlockCallback(function(table))`

Registers an item use on block event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `hand`, `item` ([Item](/common/datatypes/item.md)), `blockpos`, `blockstate` ([Block](/common/datatypes/block.md)).

**Example Usage:**
```lua
registerUseItemOnBlockCallback(function(data)
    if data.item then
        print("Used item:", data.item.name)
    end
    return true -- return false to cancel
end)
```

### `registerUseWithoutItemCallback(function(table))`

Registers a block use without item event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `blockpos`, `blockstate`.

**Example Usage:**
```lua
registerUseWithoutItemCallback(function(data)
    print("Used block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
    return true -- return false to cancel
end)
```

### `registerBreakBlockBeforeCallback(function(table))`

Registers an event before a block is broken. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `blockpos`, `blockstate`, `blockentity` ([Block entity](/common/datatypes/blockEntity.md)).

**Example Usage:**
```lua
registerBreakBlockBeforeCallback(function(data)
    print("Breaking block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
    return true -- return false to cancel
end)
```

### `registerBreakBlockAfterCallback(function(table))`

Registers an event after a block was broken.

**Parameters:**
* `function` (function (table)).

Table fields: same as [before break](#registerbreakblockbeforecallback-function-table).

**Example Usage:**
```lua
registerBreakBlockAfterCallback(function(data)
    print("Broken block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
end)
```

### `registerBreakBlockCancelCallback(function(table))`

Registers an event when breaking a block was cancelled.

**Parameters:**
* `function` (function (table)).

Table fields: same as [before break](#registerbreakblockbeforecallback-function-table).

**Example Usage:**
```lua
registerBreakBlockCancelCallback(function(data)
    print("Break cancelled at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
end)
```

### `registerAttackEntityCallback(function(table))`

Registers an entity attack event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `hand`, `entity` ([Entity](/common/datatypes/entity.md)), `hit_pos` ([Vector3](/common/datatypes/vector3.md)).

**Example Usage:**
```lua
registerAttackEntityCallback(function(data)
    print("Attacked entity:", data.entity.name)
    return true -- return false to cancel
end)
```

### `registerUseEntityCallback(function(table))`

Registers an entity use event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `hand`, `entity`, `hit_pos`.

**Example Usage:**
```lua
registerUseEntityCallback(function(data)
    print("Used entity:", data.entity.name)
    return true -- return false to cancel
end)
```

### `registerUseItemCallback(function(table))`

Registers an item use event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `hand`, `item`.

**Example Usage:**
```lua
registerUseItemCallback(function(data)
    if data.item then
        print("Used item:", data.item.name)
    end
    return true -- return false to cancel
end)
```

### `registerUseItemOnCallback(function(table))`

Registers an item use on block event (item context). Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `world`, `hand`, `item`, `blockpos`, `direction`.

**Example Usage:**
```lua
registerUseItemOnCallback(function(data)
    print("Direction:", data.direction)
    return true -- return false to cancel
end)
```

### `registerPickItemFromBlockCallback(function(table))`

Registers a pick block event. Return an item stack to override the picked item.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `blockpos`, `blockstate`, `include_data` (boolean).

**Example Usage:**
```lua
registerPickItemFromBlockCallback(function(data)
    print("Picked block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
end)
```

### `registerPickItemFromEntityCallback(function(table))`

Registers a pick entity event. Return an item stack to override the picked item.

**Parameters:**
* `function` (function (table)).

Table fields: `player`, `entity`, `include_data` (boolean).

**Example Usage:**
```lua
registerPickItemFromEntityCallback(function(data)
    print("Picked entity:", data.entity.name)
end)
```

---

## Server Message Callbacks

All server message callbacks receive a single table argument with event data.
`LuaEntity` and `LuaComponent` objects are created once per event and shared across all callbacks - modifications in one callback are visible to subsequent callbacks.

### `registerMessageDecoratorContentCallback(function(table))`

Registers a callback for the **Content Phase** of chat message decorators. Use this when the decorator modifies the text content of the message.

Return a `Component` to modify the message, or `nil` to pass through unchanged.

**Parameters:**
* `function` (function (table)).

Table fields:
* `sender` ([Entity](/common/datatypes/entity.md)?) - The message sender (may be nil for system messages). Use `sender.name` for player name.
* `message` ([Component](/common/datatypes/component.md)) - Shared message component. Modifications affect all subsequent callbacks.
* `message_raw` (Component) - The original vanilla component (read-only).

**Example Usage:**
```lua
registerMessageDecoratorContentCallback(function(data)
    if data.sender then
        local name = data.sender.name
        data.message:prepend("[" .. name .. "] ")
    end
    return data.message
end)
```

### `registerMessageDecoratorStylingCallback(function(table))`

Registers a callback for the **Styling Phase** of chat message decorators. Use this when the decorator only modifies styling (color, formatting) with the text content intact.

Return a `Component` to modify the message, or `nil` to pass through unchanged.

**Parameters:**
* `function` (function (table)).

Table fields:
* `sender` ([Entity](/common/datatypes/entity.md)?) - The message sender.
* `message` ([Component](/common/datatypes/component.md)) - Shared message component.
* `message_raw` (Component) - The original vanilla component (read-only).

**Example Usage:**
```lua
registerMessageDecoratorStylingCallback(function(data)
    if data.sender and data.sender.custom_name and data.sender.custom_name:find("Admin") then
        data.message:setColor("#FFD700") -- gold color for admins
    end
    return data.message
end)
```

### `registerAllowChatMessageCallback(function(table))`

Registers a callback to allow or block chat messages sent by players (from GUI or commands like `/msg`, `/say`, `/tellraw`).

Return `false` to block the message (prevents broadcast and `CHAT_MESSAGE` event). Called only if `ALLOW_COMMAND_MESSAGE` didn't block it first.

**Parameters:**
* `function` (function (table)).

Table fields:
* `player` ([Entity](/common/datatypes/entity.md)) - The player who sent the message.
* `message` ([Component](/common/datatypes/component.md)) - The decorated message content.
* `chat_message` ([Component](/common/datatypes/component.md)) - Same as `message`.
* `bound_chat_type` (string) - Chat type bound info.

**Example Usage:**
```lua
registerAllowChatMessageCallback(function(data)
    if data.player.name == "Spammer" then
        return false -- block
    end
    return true -- allow
end)
```

### `registerAllowGameMessageCallback(function(table))`

Registers a callback to allow or block game messages (death messages, join/leave messages, advancement messages).

Return `false` to block the message (prevents broadcast and `GAME_MESSAGE` event).

**Parameters:**
* `function` (function (table)).

Table fields:
* `server` ([Server](/server/server.md)) - The server instance.
* `message` ([Component](/common/datatypes/component.md)) - The game message.
* `overlay` (boolean) - Whether the message is an overlay (action bar).

**Example Usage:**
```lua
registerAllowGameMessageCallback(function(data)
    if data.overlay then
        return false -- hide action bar messages
    end
    return true
end)
```

### `registerAllowCommandMessageCallback(function(table))`

Registers a callback to allow or block command messages (from `/me`, `/say`, `/tellraw`, etc. - not `/msg`).

Return `false` to block the message (prevents broadcast and `COMMAND_MESSAGE` event). If allowed, `ALLOW_CHAT_MESSAGE` and `CHAT_MESSAGE` events will also fire.

**Parameters:**
* `function` (function (table)).

Table fields:
* `source` ([Entity](/common/datatypes/entity.md)?) - Command source entity (may be nil for console/command block).
* `message` ([Component](/common/datatypes/component.md)) - The decorated message content.
* `chat_message` ([Component](/common/datatypes/component.md)) - Same as `message`.
* `bound_chat_type` (string) - Chat type bound info.

**Example Usage:**
```lua
registerAllowCommandMessageCallback(function(data)
    if data.source and data.source.name == "Console" then
        return false -- block console commands
    end
    return true
end)
```

### `registerChatMessageCallback(function(table))`

Registers a callback fired when a chat message is broadcast to all players. Not called if message was blocked by `ALLOW_CHAT_MESSAGE`.

**Parameters:**
* `function` (function (table)).

Table fields:
* `player` ([Entity](/common/datatypes/entity.md)) - The player who sent the message.
* `message` ([Component](/common/datatypes/component.md)) - The decorated message content.
* `chat_message` ([Component](/common/datatypes/component.md)) - Same as `message`.
* `bound_chat_type` (string) - Chat type bound info.

**Example Usage:**
```lua
registerChatMessageCallback(function(data)
    print("Chat:", data.player.name, "->", data.message:getString())
    -- Log to Discord, database, etc.
end)
```

### `registerGameMessageCallback(function(table))`

Registers a callback fired when a game message is broadcast to all players. Not called if message was blocked by `ALLOW_GAME_MESSAGE`.

**Parameters:**
* `function` (function (table)).

Table fields:
* `server` ([Server](/server/server.md)) - The server instance.
* `message` ([Component](/common/datatypes/component.md)) - The game message.
* `overlay` (boolean) - Whether the message is an overlay.

**Example Usage:**
```lua
registerGameMessageCallback(function(data)
    if data.overlay then
        return -- ignore action bar
    end
    print("Game:", data.message:getString())
end)
```

### `registerCommandMessageCallback(function(table))`

Registers a callback fired when a command message is broadcast (from `/me`, `/say`, `/tellraw`). Fires before `ALLOW_CHAT_MESSAGE` and `CHAT_MESSAGE`.

**Parameters:**
* `function` (function (table)).

Table fields:
* `source` ([Entity](/common/datatypes/entity.md)?) - Command source entity.
* `message` ([Component](/common/datatypes/component.md)) - The decorated message content.
* `chat_message` ([Component](/common/datatypes/component.md)) - Same as `message`.
* `bound_chat_type` (string) - Chat type bound info.

**Example Usage:**
```lua
registerCommandMessageCallback(function(data)
    local src = data.source and data.source.name or "Console"
    print("Command msg from", src, ":", data.message:getString())
end)
```

---

## Unregistration Functions

Each registration function has a corresponding unregister function (`unregister...`) that removes a specific callback.

The mod itself unregisters all hooks on unload.

**List:** `unregisterUnloadCallback`, `unregisterServerTick`, `unregisterServerTickPre`, `unregisterServerTickPost`, `unregisterServerWorldTick`, `unregisterServerWorldTickPre`, `unregisterServerWorldTickPost`, `unregisterAttackBlockCallback`, `unregisterUseBlockCallback`, `unregisterUseItemOnBlockCallback`, `unregisterUseWithoutItemCallback`, `unregisterBreakBlockBeforeCallback`, `unregisterBreakBlockAfterCallback`, `unregisterBreakBlockCancelCallback`, `unregisterAttackEntityCallback`, `unregisterUseEntityCallback`, `unregisterUseItemCallback`, `unregisterUseItemOnCallback`, `unregisterPickItemFromBlockCallback`, `unregisterPickItemFromEntityCallback`, `unregisterMessageDecoratorContentCallback`, `unregisterMessageDecoratorStylingCallback`, `unregisterAllowChatMessageCallback`, `unregisterAllowGameMessageCallback`, `unregisterAllowCommandMessageCallback`, `unregisterChatMessageCallback`, `unregisterGameMessageCallback`, `unregisterCommandMessageCallback`.

**Example Usage:**
```lua
local myCallback = registerServerTick(function()
    print("tick")
end)
-- Later:
unregisterServerTick(myCallback)
```
