---
icon: map-location
---

# Vector3

## Variables

### **x** (_number_)

### **y** (_number_)

### **z** (_number_)

## Functions

### `add(x, y, z)`

Add cordinates to vector.

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local upperVector = vector3.add(0, 1, 0)
```

### `sub(x, y, z)`

Sub cordinates to vector.

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local downVector = vector3.sub(0, 1, 0)
```

### `mul(x, y, z)`

Mul cordinates to vector.

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local halfUpperVector = vector3.mul(0, 0.5, 0)
```

### `div(x, y, z)`

Div cordinates to vector.

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local halfDownVector = vector3.div(0, 0.5, 0)
```

### `neg(x, y, z)`

Flips the vector to negative.

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local halfDownVector = vector3.neg(1, 1, 1)
```

### `length()`

Get vector lenght.

**Returns:**

* (number) Return vector lenght.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local lenght = vector3.length()
```

### `lengthSquared()`

Get vector squared lenght.

**Returns:**

* (number) Return squared vector lenght.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local lenght = vector3.lengthSquared()
```

### `normalize()`

Normalize vector.

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local normalized = vector3.normalize()
```

### `dot(x, y, z)`

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* (number). .

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local dot = vector3.dot(2, 2, 2)
```

### `cross(x, y, z)`

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* (number). .

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local dot = vector3.cross(2, 2, 2)
```

### `distanceTo(x, y, z)`

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* (number). .

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local distance = vector3.distanceTo(2, 2, 2)
```

### `distanceToSqr(x, y, z)`

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* (number). .

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local distance = vector3.distanceToSqr(2, 2, 2)
```

### `angleTo(x, y, z)`

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* (number). .

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local angle = vector3.angleTo(2, 2, 2)
```

### `lerp(x, y, z, t)`

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

* `t` (number).

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local lerp = vector3.lerp(2, 2, 2, 50)
```

### `toRadians()`

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local radiants = vector3.toRadians()
```

### `toDegrees()`

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local degress = vector3.toDegrees()
```

### `horizontalDistanceTo(x, y, z)`

**Parameters:**

* `x` (number).

* `y` (number).

* `z` (number).

**Returns:**

* (number) Return horizontal distance.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local distance = vector3.horizontalDistanceTo(2, 1, 2)
```

### `yRot()`

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local rot = vector3.yRot()
```

### `xRot()`

**Returns:**

* [vector3](../datatypes/vector3.md). New vector.

**Example Usage:**

```lua
-- Example code showing how to use the function
local creator = require("creator")
local vector3 = creator.createVector3(1, 1, 1)
local rot = vector3.xRot()
```