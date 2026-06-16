---
description: A library for creating various game classes using Lua.
icon: plus
---

# Creator

## `createBox(minX, minY, minZ, maxX, maxY, maxZ)`

Create [box](../datatypes/box.md).

**Parameters:**

* `minX` (double).
* `minY` (double).
* `minZ` (double).
* `maxX` (double).
* `maxY` (double).
* `maxZ` (double).

**Example Usage:**

```Lua
-- Example code showing how to use the function
local creator = require("creator")
local box = creator.createBox(0, 0, 0, 1, 1 ,1)
registerWorldRenderer(function(context)
    local filled = {
        box = box,
        red = 255, green = 0, blue = 0, alpha = 140,
        through_walls = false
    }
    context.renderFilled(filled)
end)
```

## `createVector3(x, y, z)`

Create [vector3](../datatypes/vector3.md).

**Parameters:**

* `x` (double).
* `y` (double).
* `z` (double).

**Example Usage:**

```Lua
-- Example code showing how to use the function
local creator = require("creator")
local vector = creator.createVector3(1, 1, 1)
```

## `createBlockPos(x, y, z)`

Create [blockPos](../datatypes/blockPos.md).

**Parameters:**

* `x` (integer).
* `y` (integer).
* `z` (integer).

**Example Usage:**

```Lua
-- Example code showing how to use the function
local creator = require("creator")
local blockpos = creator.createBlockPos(1, 1, 1)
```

## `createBlockState(id)`

Create [block](../datatypes/block.md).

**Parameters:**

* `id` (integer).

**Example Usage:**

```Lua
-- Example code showing how to use the function
local creator = require("creator")
local world = require("world")
local blockState = creator.createBlockState(1)
world.setBlock(0, 64, 0, blockState)
```

## `createDirection(name)`

Create a [Direction](../datatypes/direction.md).

**Parameters:**

* `name` (string) - one of: "down", "up", "north", "south", "west", "east".

**Example Usage:**

```Lua
local creator = require("creator")
local dir = creator.createDirection("north")
print(dir.opposite.name) -- "south"
```

## `createItemStackFromIdentifier(identifier)`

Create an item from identifier string.

**Parameters:**

* `identifier` (string) - e.g. "minecraft:stone".

**Example Usage:**

```Lua
local creator = require("creator")
local item = creator.createItemStackFromIdentifier("minecraft:diamond_sword")
```

## `createItemStackFromId(id)`

Create an item from numeric item ID.

**Parameters:**

* `id` (number) - numeric item ID.

## `createItemStackFromHypixelSkyblockId(neu_id)`

Create an item from Hypixel Skyblock NEU ID.

**Parameters:**

* `neu_id` (string) - e.g. "HYPERION".

**Example Usage:**

```Lua
local creator = require("creator")
local item = creator.createItemStackFromHypixelSkyblockId("HYPERION")
```