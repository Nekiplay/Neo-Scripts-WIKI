---
description: Block registry lookup library
icon: cube
---

# Blocks

## `getAll()`

Returns a table of all registered block states.

**Returns:**

* (table) List of [Block](../datatypes/block.md) objects.

**Example Usage:**

```lua
-- Example code showing how to use the function
local blocks = require("blocks")
local allBlocks = blocks.getAll()
for i, block in ipairs(allBlocks) do
    print(block.name)
end
```

## `getFromId(id)`

Gets a block state by its numeric ID.

**Parameters:**

* `id` (number) - Numeric block ID.

**Returns:**

* ([Block](../datatypes/block.md)) Block state, or `nil` if not found.

**Example Usage:**

```lua
-- Example code showing how to use the function
local blocks = require("blocks")
local stone = blocks.getFromId(1)
if stone then
    print("Block name: " .. stone.name)
end
```

## `getFromIdentifier(identifier)`

Gets a block state by its identifier string.

**Parameters:**

* `identifier` (string) - Block identifier (e.g. "minecraft:stone").

**Returns:**

* ([Block](../datatypes/block.md)) Block state, or `nil` if not found.

**Example Usage:**

```lua
-- Example code showing how to use the function
local blocks = require("blocks")
local stone = blocks.getFromIdentifier("minecraft:stone")
if stone then
    print("Block ID: " .. stone.id)
end
```
