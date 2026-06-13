---
description: Implementation AABB
icon: square-full
---

# Box

## Variables

### **minX** (_number_)

### **minY** (_number_)

### **minZ** (_number_)

### **maxX** (_number_)

### **maxY** (_number_)

### **maxZ** (_number_)

### **min** (_table_) { x, y, z }

### **max** (_table_) { x, y, z }

## Functions

### `getSize()`

Return box size.

**Returns:**

* (number) Box size.

**Example Usage:**

```lua
--- Example code showing how to use the function
local box = player.entity.box
local size = box.getSize()
```

### `getXSize()`

Return box x size.

**Returns:**

* (number) Box x size.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local size = box.getXSize()
```

### `getZSize()`

Return box z size.

**Returns:**

* (number) Box z size.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local size = box.getZSize()
```

### `getYSize()`

Return box y size.

**Returns:**

* (number) Box y size.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local size = box.getYSize()
```

### `getCenter()`

Return box center.

**Returns:**

* (table) { x, y, z }.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local center = box.getCenter()
local x = center.x
local y = center.y
local z = center.z
```

### `setMinX(number)`

Change box mix x size.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.setMinX(1)
```

### `setMinY(number)`

Change box mix y size.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.setMinY(1)
```

### `setMinZ(number)`

Change box mix z size.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.setMinZ(1)
```

### `setMaxX(number)`

Change box max x size.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.setMaxX(1)
```

### `setMaxY(number)`

Change box max y size.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.setMaxY(1)
```

### `setMaxZ(number)`

Change box max z size.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.setMaxZ(1)
```

### `expand(x, y, z)`

Expand box.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.expand(0.0, 2.0, 0.0)
```

### `inflate(x, y, z)`

Inflate box.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.inflate(0.0, 2.0, 0.0)
```

### `deflate(x, y, z)`

Deflate box.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.deflate(1.0, 1.0, 1.0)
```

### `intersect(x, y, z)`

Intersect box.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.intersect(1.0, 1.0, 1.0)
```

### `move(x, y, z)`

Move box.

**Returns:**

* ([Box](box.md)) Return new box.

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local newBox = box.move(0.0, 2.0, 0.0)
```

### `distanceToSqr(x, y, z)`

Get squared distance to position.

**Returns:**

* (number) - Distance

**Example Usage:**

```lua
-- Example code showing how to use the function
local box = player.entity.box
local distance = box.distanceToSqr(0.0, 0.0, 0.0)
```

