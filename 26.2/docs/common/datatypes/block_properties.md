---
description: Returned information about the blocks properties
icon: cube
---

# Block Properties

## Variables

**any** (any) get any property

## Functions

### `getAll()`

Return all block properties.

**Returns:**
* (table) Block properties.

**Example Usage:**
```lua
local world = require("world")
local block = world.getBlock(0, 64, 0)
if block then
    local properties = block.properties.getAll()
	print(properties[1])
end
```
