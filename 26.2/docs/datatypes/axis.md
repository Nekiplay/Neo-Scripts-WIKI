---
icon: arrows-up-down
---

# Axis

## Variables

### **name** (_string_)
Axis name (e.g. "x", "y", "z").

### **isHorizontal** (_boolean_)
Whether this axis is horizontal (x or z).

### **isVertical** (_boolean_)
Whether this axis is vertical (y).

### **negative** ([Direction](direction.md))
The negative direction along this axis.

### **positive** ([Direction](direction.md))
The positive direction along this axis.

**Example Usage:**
```lua
local creator = require("creator")
local dir = creator.createDirection("north")
local axis = dir.axis
print(axis.isHorizontal)  -- true
print(axis.positive.name)  -- "south"
```
