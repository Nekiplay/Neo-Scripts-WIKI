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

## `createTransform(tx, ty, tz, sx, sy, sz, rx, ry, rz)`

Create [transform](../datatypes/transform.md) for display entities (`text_display`, `item_display`, `block_display`). All parameters are optional - without arguments an identity transform is created.

**Parameters:**

* `tx`, `ty`, `tz` (number, optional) - translation offset.
* `sx`, `sy`, `sz` (number, optional) - scale.
* `rx`, `ry`, `rz` (number, optional) - rotation in degrees.

**Example Usage:**

```Lua
local creator = require("creator")

-- Identity
local t = creator.createTransform()

-- Translation + rotation 45 degrees around Y
local rotated = creator.createTransform(0, 0.5, 0, 1, 1, 1, 0, 45, 0)
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