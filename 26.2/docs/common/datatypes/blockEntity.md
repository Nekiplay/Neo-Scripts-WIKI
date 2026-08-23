---
description: Returned information about block entities
icon: cube
---

# Block Entity

Returned by [world.getBlockEntity(...)](/server/world.md#getblockentityx-y-z).

## Variables

**blockstate** / **blockState** / **block** ([Block](block.md)) - block state of the block entity

**x** (_number_) - X position

**y** (_number_) - Y position

**z** (_number_) - Z position

**pos** ([blockPos](blockPos.md)) - block position

**type** / **identifier** / **entity\_type** (_string_) - block entity type identifier (e.g. "minecraft:furnace")

**is\_container** / **has\_inventory** (_boolean_) - whether the block entity has an inventory

**size** (_number_) - inventory slot count (only for containers)

**inventory** (_table list of [Items](item.md)_) - list of items in the container, empty slots are `nil` (only for containers)

### Furnace properties

Available only for furnace-like block entities (`minecraft:furnace`, `minecraft:blast_furnace`, `minecraft:smoker`):

**is\_lit** / **lit** / **is\_burning** (_boolean_) - whether the furnace is burning

**burn\_time** / **burntime** / **fuel** (_number_) - remaining fuel burn time

**burn\_duration** / **burn\_duration\_total** / **fuel\_duration** (_number_) - total fuel burn duration

**cook\_time** / **cooking\_progress** (_number_) - current cooking progress

**cook\_total\_time** / **cook\_time\_total** / **cooking\_total\_time** (_number_) - total cooking time

## Settable Properties

### Container slots

Individual slots can be set by numeric index (1-based). Setting a slot to `nil` clears it:

```lua
blockEntity[1] = item   -- set item to first slot
blockEntity[1] = nil    -- clear first slot
```

### `inventory`

Sets the whole inventory from a table of [items](item.md). Slots beyond the table length are kept:

```lua
local items = require("items")

local diamond = items.getFromIdentifier("minecraft:diamond")
if diamond then
    blockEntity.inventory = { diamond }
end
```

### Furnace properties

* **is\_lit** / **lit** / **is\_burning** (_boolean_) - `true` ignites the furnace, `false` extinguishes it
* **burn\_time** / **burntime** / **fuel** (_number_)
* **burn\_duration** / **burn\_duration\_total** / **fuel\_duration** (_number_)
* **cook\_time** / **cooking\_progress** (_number_)
* **cook\_total\_time** / **cook\_time\_total** / **cooking\_total\_time** (_number_)

All changes call `setChanged()` on the block entity so the state syncs to clients.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

-- Ignite a furnace
local be = world.getBlockEntity(100, 64, 100)
if be then
    be.is_lit = true
    print(be.burn_time .. " / " .. be.burn_duration)
end
```
