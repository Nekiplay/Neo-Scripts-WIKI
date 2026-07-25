---
icon: window-maximize
description: Window information and control
---

# Window

## Variables

### **isMinimized** (_boolean_)
Whether the game window is minimized.

### **isFullscreen** (_boolean_)
Whether the game window is in fullscreen mode.

### **refreshRate** (_number_)
The monitor refresh rate.

### **x** (_number_)
Window X position on screen.

### **y** (_number_)
Window Y position on screen.

### **width** (_number_)
Window width in pixels.

### **height** (_number_)
Window height in pixels.

### **screenWidth** (_number_)
Screen/monitor width in pixels.

### **screenHeight** (_number_)
Screen/monitor height in pixels.

## Functions

### `setTitle(title)`

Sets the game window title.

**Parameters:**
* `title` (string) - New window title.

**Returns:**
* (boolean) Return true if successfully.

**Example Usage:**
```lua
-- Example code showing how to use the function
local window = require("window")
local status = window.setTitle("Hypixel Cry - Custom Title")
```

## Complete Example

```lua
local window = require("window")

print("Window size: " .. window.width .. "x" .. window.height)
print("Screen size: " .. window.screenWidth .. "x" .. window.screenHeight)
print("Fullscreen: " .. tostring(window.isFullscreen))

-- Change window title
window.setTitle("My Script")
```
