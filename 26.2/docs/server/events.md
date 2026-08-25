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

## Unregistration Functions

Each registration function has a corresponding unregister function (`unregister...`) that removes a specific callback.

The mod itself unregisters all hooks on unload.

**List:** `unregisterUnloadCallback`, `unregisterServerTick`, `unregisterServerTickPre`, `unregisterServerTickPost`, `unregisterServerWorldTick`, `unregisterServerWorldTickPre`, `unregisterServerWorldTickPost`, `unregisterAttackBlockCallback`, `unregisterUseBlockCallback`, `unregisterUseItemOnBlockCallback`, `unregisterUseWithoutItemCallback`, `unregisterBreakBlockBeforeCallback`, `unregisterBreakBlockAfterCallback`, `unregisterBreakBlockCancelCallback`, `unregisterAttackEntityCallback`, `unregisterUseEntityCallback`, `unregisterUseItemCallback`, `unregisterUseItemOnCallback`, `unregisterPickItemFromBlockCallback`, `unregisterPickItemFromEntityCallback`.

**Example Usage:**
```lua
local myCallback = registerServerTick(function()
    print("tick")
end)
-- Later:
unregisterServerTick(myCallback)
```
