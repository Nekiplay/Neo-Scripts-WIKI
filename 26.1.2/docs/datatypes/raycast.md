---
icon: crosshairs
---

# Raycast

## Variables

### **type** (_string_)
The type of hit result: `"block"`, `"entity"`, or `"miss"`.

### **location** ([Vector3](../datatypes/vector3.md))
The hit position in the world.

### **data** ([Entity](../datatypes/entity.md))
The entity that was hit. Only available when `type` is `"entity"`.

### **entity** ([Entity](../datatypes/entity.md))
Alias for `data`.

### **blockPos** ([BlockPos](../datatypes/blockPos.md))
The block position that was hit. Only available when `type` is `"block"`.

### **side** ([Direction](../datatypes/direction.md))
The side/face of the block that was hit. Only available when `type` is `"block"`.

**Example Usage:**
```lua
local player = require("player")
local raycastResult = player.raycast(4.5)
if raycastResult == nil then
   print("MISS")
else
   local resultType = raycastResult.type
   if resultType == "block" then
      local x = raycastResult.blockPos.x
      local y = raycastResult.blockPos.y
      local z = raycastResult.blockPos.z
      local side = raycastResult.side.name
      print("Hit block at " .. x .. ", " .. y .. ", " .. z .. " on " .. side)
   elseif resultType == "entity" then
      local entityData = raycastResult.data
      print("Hit entity: " .. entityData.name)
   end
end
```
