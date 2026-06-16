---
icon: arrows-left-right
---

# Direction

## Variables

### **name** (_string_)
Direction name (e.g. "down", "up", "north", "south", "west", "east")

### **opposite** ([Direction](direction.md))
Opposite direction.

### **axisDirection** ([AxisDirection](axis-direction.md))
Axis direction of this direction.

### **axis** ([Axis](axis.md))
Axis of this direction.

### **clockWise** ([Direction](direction.md))
Clockwise direction.

### **step** (_table_)
Step vector as a table { x, y, z }.

**Example Usage:**
```lua
local creator = require("creator")
local dir = creator.createDirection("north")
print(dir.name) -- "north"
print(dir.opposite.name) -- "south"
print(dir.step.x, dir.step.y, dir.step.z) -- step values
```
