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
local box = player.entity.box
local size = box.getSize()
```

### `getXSize()`

Return box x size.

**Returns:**
* (number)

### `getZSize()`

Return box z size.

**Returns:**
* (number)

### `getYSize()`

Return box y size.

**Returns:**
* (number)

### `getCenter()`

Return box center.

**Returns:**
* (table) { x, y, z }.

### `setMinX(number)`

Change box min x size.

**Returns:**
* ([Box](box.md)) Return new box.

### `setMinY(number)`, `setMinZ(number)`, `setMaxX(number)`, `setMaxY(number)`, `setMaxZ(number)`

Change box bounds.

**Returns:**
* ([Box](box.md))

### `expand(x, y, z)`

Expand box by given amounts.

**Returns:**
* ([Box](box.md))

### `contract(x, y, z)`

Contract box by given amounts.

**Returns:**
* ([Box](box.md))

### `inflate(x, y, z)`

Inflate box (expand in all directions).

**Returns:**
* ([Box](box.md))

### `deflate(x, y, z)`

Deflate box (shrink in all directions).

**Returns:**
* ([Box](box.md))

### `intersect(box)`

Intersect with another box.

**Returns:**
* ([Box](box.md))

### `union(box)`

Union with another box (minmax of both).

**Returns:**
* ([Box](box.md))

### `move(x, y, z)`

Move box by offset.

**Returns:**
* ([Box](box.md))

### `offset(x, y, z)`

Alias for move.

### `intersects(box)`

Check if boxes intersect.

**Parameters:**
* `box` ([Box](box.md)) or (x1, y1, z1, x2, y2, z2).

**Returns:**
* (boolean)

### `contains(x, y, z)`

Check if point is inside box.

**Parameters:**
* `x` (number), `y` (number), `z` (number)

**Returns:**
* (boolean)

### `clip(start, end)`

Clip a ray against the box.

**Parameters:**
* `start` (table) - { x, y, z }
* `end` (table) - { x, y, z }

**Returns:**
* (table) - { x, y, z } or nil if no intersection

### `distanceToSqr(x, y, z)`

Get squared distance to position.

**Returns:**
* (number)

**Example Usage:**
```lua
local box = player.entity.box
local distance = box.distanceToSqr(0.0, 0.0, 0.0)
```
