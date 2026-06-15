---
description: Block scanning iterator for efficient area scanning
icon: grid-2-plus
---

# Block Scanner

The `block_iterator` module provides an efficient way to scan blocks in a cubic area without causing lag. It processes blocks in batches.

## `new_iterator(x, y, z, radius)`

Creates a new block iterator centered at the given coordinates with the specified radius.

**Parameters:**

* `x` (number) - Center X coordinate.
* `y` (number) - Center Y coordinate.
* `z` (number) - Center Z coordinate.
* `radius` (number) - Scan radius from center.

**Returns:**

* ([BlockIterator](block-scanner.md#block-iterator-methods)) A new block iterator object.

**Example Usage:**

```lua
-- Example code showing how to use the function
local scanner = require("block_iterator")
local player = require("player")
local pos = player.getPos()
local iterator = scanner.new_iterator(math.floor(pos.x), math.floor(pos.y), math.floor(pos.z), 16)
```

## Block Iterator Methods

### `iterator:next_batch(limit)`

Returns the next batch of non-air blocks found by the iterator.

**Parameters:**

* `limit` (number, optional) - Maximum number of blocks to return per batch. Default: 1000.

**Returns:**

* (table) List of entries, each containing `{x, y, z, blockState}`.
* (boolean) `true` if there are more blocks to scan.

**Example Usage:**

```lua
-- Example code showing how to use the function
local scanner = require("block_iterator")
local player = require("player")
local pos = player.getPos()

local iterator = scanner.new_iterator(
    math.floor(pos.x),
    math.floor(pos.y),
    math.floor(pos.z),
    16
)

local more = true
while more do
    local blocks, hasMore = iterator.next_batch(500)
    more = hasMore
    
    for i, entry in ipairs(blocks) do
        local x = entry[1]
        local y = entry[2]
        local z = entry[3]
        local blockState = entry[4]
        print("Found " .. blockState.name .. " at " .. x .. ", " .. y .. ", " .. z)
    end
    
    -- Allow other code to run between batches
    -- (useful for spread scanning across multiple ticks)
end
```

### `iterator.progress`

Returns the current scanning progress as a value between 0.0 and 1.0.

**Returns:**

* (number) Progress value from 0.0 (not started) to 1.0 (complete, with some floating point error).

**Example Usage:**

```lua
-- Example code showing how to use the function
local scanner = require("block_iterator")
local player = require("player")
local pos = player.getPos()

local iterator = scanner.new_iterator(
    math.floor(pos.x),
    math.floor(pos.y),
    math.floor(pos.z),
    16
)

-- Check progress
print("Scan progress: " .. (iterator.progress * 100) .. "%")
```
