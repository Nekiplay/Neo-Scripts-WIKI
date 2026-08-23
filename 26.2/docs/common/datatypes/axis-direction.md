---
icon: arrow-up
---

# AxisDirection

## Variables

### **name** (_string_)
Axis direction name (e.g. "positive", "negative").

### **opposite** ([AxisDirection](axis-direction.md))
The opposite axis direction.

### **step** (_number_)
The step value: `1` for positive, `-1` for negative.

**Example Usage:**
```lua
local creator = require("creator")
local dir = creator.createDirection("north")
local axisDir = dir.axisDirection
print(axisDir.name)  -- "negative"
print(axisDir.step)  -- -1
```
