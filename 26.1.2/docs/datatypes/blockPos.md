---
icon: map-location
---

# BlockPos

## Variables

### **x** (_number_)

### **y** (_number_)

### **z** (_number_)

### **bottomCenter** [vector3](../datatypes/vector3.md).

### **center** [vector3](../datatypes/vector3.md).

### **above** [blockPos](../datatypes/blockPos.md).

### **below** [blockPos](../datatypes/blockPos.md).

### **east** [blockPos](../datatypes/blockPos.md).

### **north** [blockPos](../datatypes/blockPos.md).

### **west** [blockPos](../datatypes/blockPos.md).

### **south** [blockPos](../datatypes/blockPos.md).

## Functions

### `distSqr(x, y, z)`

Get sqr distance to cordinates.

**Parameters:**

* `x` (integer).

* `y` (integer).

* `z` (integer).

**Returns:**

* (number) Return dinstance.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local blockPos = creator.createBlockPos(1, 1, 1)
local player = require("player")
local distance = blockPos.distSqr(math.floor(player.entity.x), math.floor(player.entity.y), math.floor(player.entity.z))
```

### `distToCenterSqr(x, y, z)`

Get sqr distance to cordinates.

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* (number) Return dinstance.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local blockPos = creator.createBlockPos(1, 1, 1)
local player = require("player")
local distance = blockPos.distToCenterSqr(player.entity.x, player.entity.y, player.entity.z)
```