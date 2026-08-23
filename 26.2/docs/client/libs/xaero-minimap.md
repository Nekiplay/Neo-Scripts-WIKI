---
description: Xaero's Minimap integration for waypoints
icon: map
---

# Xaero Minimap

Integration with Xaero's Minimap mod for waypoint management.

**Module names:** `xaero`, `xaero-minimap`, `xaerominimap`

**Requires:** Xaero's Minimap mod to be installed.

```lua
local xaero = require("xaero")
```

## `createWaypoint(world, x, y, z, text, initials, color)`

Create a waypoint.

**Parameters:**
* `world` (string, optional) - dimension ID (default: "minecraft:overworld").
* `x` (number) - X coordinate.
* `y` (number) - Y coordinate.
* `z` (number) - Z coordinate.
* `text` (string, optional) - waypoint name (default: "text").
* `initials` (string, optional) - short label (default: "T").
* `color` (number, optional) - waypoint color (default: 0).

**Example Usage:**
```lua
local xaero = require("xaero")

-- Create a waypoint at your current position
local player = require("player")
local pos = player:getPos()

xaero.createWaypoint(
    "minecraft:overworld",
    math.floor(pos.x),
    math.floor(pos.y),
    math.floor(pos.z),
    "Home",
    "H",
    0xFF0000  -- red
)
```

## `removeWaypoint(world, index)`

Remove a waypoint by index.

**Parameters:**
* `world` (string, optional) - dimension ID.
* `index` (number) - waypoint index (1-based).

**Example Usage:**
```lua
local xaero = require("xaero")
xaero.removeWaypoint("minecraft:overworld", 1)
```

## `getWaypoints(world)`

Get all waypoints in a dimension.

**Parameters:**
* `world` (string, optional) - dimension ID.

**Returns:**
* (table) List of waypoints with fields: name, initials, isDisabled, isGlobal, color, x, y, z.

**Example Usage:**
```lua
local xaero = require("xaero")

local waypoints = xaero.getWaypoints("minecraft:overworld")
for _, wp in ipairs(waypoints) do
    print(string.format(
        "Waypoint: %s (%s) at %d, %d, %d",
        wp.name, wp.initials, wp.x, wp.y, wp.z
    ))
end
```
