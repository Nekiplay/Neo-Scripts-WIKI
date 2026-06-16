---
icon: earth-africa
---

# World

## `getBlock(x, y, z)` / `getBlockState(x, y, z)`

Gets information about a block by coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.

**Returns:**

* ([Block data](../datatypes/block.md)) Return block information

**Example Usage:**


```lua
-- Example code showing how to use the function
local world = require("world")
local blockInfo = world.getBlock(1, 1, 1)
-- getBlockState is an alias for getBlock
local blockInfo2 = world.getBlockState(1, 1, 1)
```

## `setBlock(x, y, z, id)`

Sets the block to the desired coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.
* `id` (number) - Raw block id.

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
world.setBlock(1, 1, 1, 1) -- Set stone to 1, 1, 1
```

## `isBlockLoaded(x, y, z)`

Sets the block to the desired coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.

**Returns:**

* (boolean)

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local loaded = world.isBlockLoaded(1, 1, 1)
```

## `getOutlineBoxes(x, y, z, blockState)`

Sets the block to the desired coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.
* `blockState` (Block data)

**Returns:**

* table ([boxes](../datatypes/box.md))

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local blockState = world.getBlock(x, y, z)
if blockState then
    local collisions = world.getOutlineBoxes(x, y, z, blockState)
    if collisions then
        for i = 1, #collisions do
            local collision = collisions[i]
            
            local mixX = collision.minX
            local mixY = collision.minY
            local mixZ = collision.minZ
            
            local maxX = collision.maxX
            local maxY = collision.maxY
            local maxZ = collision.maxZ
        end
    end
end
```

## `getCollisionBoxes(x, y, z, blockState)`

Sets the block to the desired coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.
* `blockState` (Block data)

**Returns:**

* table ([boxes](../datatypes/box.md))

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local blockState = world.getBlock(x, y, z)
if blockState then
    local collisions = world.getCollisionBoxes(x, y, z, blockState)
    if collisions then
        for i = 1, #collisions do
            local collision = collisions[i]
            
            local mixX = collision.minX
            local mixY = collision.minY
            local mixZ = collision.minZ
            
            local maxX = collision.maxX
            local maxY = collision.maxY
            local maxZ = collision.maxZ
        end
    end
end
```

## `getEntities()`

Returns a list of entities.

**Returns:**

* ([List of entitites](https://skillshop.gitbook.io/hypixelcry/datatypes/entity-data)[entity.md](../datatypes/entity.md "mention")) Return table (list) of entities

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local entities = world.getEntities()
for index, entity in ipairs(entities) do
    if entity ~= nil then
        local entityName = entity.name
        local entityId = entity.id
        
        print(string.format("Entity %d: %s", 
              index, entityName))
    end
end
```

## `getEntitiesInBox(entity, box)`

Returns a list of entities.

**Parameters:**

* `entity` ([entity](../datatypes/entity.md)) - From entity.
* `box` ([box](../datatypes/box.md)) - Search box.

**Returns:**

* ([List of entitites](https://skillshop.gitbook.io/hypixelcry/datatypes/entity-data)[entity.md](../datatypes/entity.md "mention")) Return table (list) of entities

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local function findArmorStandAboveEntity(entity)
    if not entity then return nil end
  
	local entities = world.getEntitiesInBox(entity.box.expand(0, 2, 0))
	if entities then
		for _, ent in ipairs(entities) do
			if ent and ent.type == "entity.minecraft.armor_stand" then
				return ent
			end
		end
	end
    
    return nil
end
```

## `getLivingEntities()`

Returns a list of entities.

**Returns:**

* ([List of entitites](https://skillshop.gitbook.io/hypixelcry/datatypes/entity-data)[entity.md](../datatypes/entity.md "mention")) Return table (list) of entities

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local entities = world.getLivingEntities()
for index, entity in ipairs(entities) do
    if entity ~= nil then
        local entityName = entity.name
        local entityId = entity.id
        
        print(string.format("Entity %d: %s", 
              index, entityName))
    end
end
```

## `getEntityById(id)`

Returns a list of entities.

**Parameters:**

* `id` (number) - Entity id.

**Returns:**

* ([Entity](../datatypes/entity.md)) Return entity

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local entity = world.getEntityById(0)
if entity then
    local entityName = entity.name
    local entityId = entity.id
        
    print(string.format("Entity %d: %s", 
          index, entityName))
end
```

## `getLight(x, y, z)` / `getBrightness(x, y, z)`

Gets the block light level at the specified coordinates.

**Parameters:**

* `x` (number) - X coordinate.
* `y` (number) - Y coordinate.
* `z` (number) - Z coordinate.

**Returns:**

* (number) Light level (0-15).

**Example Usage:**

```lua
local world = require("world")
local light = world.getLight(0, 64, 0)
print("Block light: " .. light)
```

## `getLightSky(x, y, z)` / `getBrightnessSky(x, y, z)`

Gets the sky light level at the specified coordinates.

**Parameters:**

* `x` (number) - X coordinate.
* `y` (number) - Y coordinate.
* `z` (number) - Z coordinate.

**Returns:**

* (number) Sky light level (0-15).

**Example Usage:**

```lua
local world = require("world")
local light = world.getLightSky(0, 64, 0)
print("Sky light: " .. light)
```

## `getArmorStandEntities()`

Returns a list of all armor stand entities.

**Returns:**

* (table) List of armor stand [entities](../datatypes/entity.md).

**Example Usage:**

```lua
local world = require("world")
local armorStands = world.getArmorStandEntities()
for _, stand in ipairs(armorStands) do
    print(stand.name)
end
```

## `getArmorStandEntitiesInBox(box)`

Returns a list of armor stand entities within the specified box.

**Parameters:**

* `box` ([Box](../datatypes/box.md)) - The search box.

**Returns:**

* (table) List of armor stand [entities](../datatypes/entity.md).

**Example Usage:**

```lua
local world = require("world")
local player = require("player")

-- Find armor stands near the player
local searchBox = player.entity.box.expand(5, 5, 5)
local armorStands = world.getArmorStandEntitiesInBox(searchBox)
for _, stand in ipairs(armorStands) do
    print("Found armor stand: " .. stand.name)
end
```

## `getRotation(x, y, z)`

Get yaw and pitch for 3d cordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.

**Returns:**

* (table) Return table (yaw, pitch)

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local rotation = world.getRotation(1, 1, 1)
local player = require("player")
player.setRotation(rotation.yaw, rotation.pitch)
```

## `playSound(x, y, z, soundIdentifier, volume, pitch)`

Get yaw and pitch for 3d cordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.
* `soundIdentifier` (string) - example: minecraft:block.anvil.place
* `volume` (number)
* `pitch` (number)

**Returns:**

* boolean

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local player = require("player")
world.playSound(player.getPos().x, player.getPos().y, player.getPos().z, "minecraft:block.anvil.place")
```

## `raycast(obj)`

Return raycast result.

**Parameters:**

* `obj` (table).

**Returns:**

* (table) Return table

**Example Usage:**

```lua
-- Example code showing how to use the function
local world = require("world")
local player = require("player")

local eyePos = player.getEyePosition()
local targetX, targetY, targetZ = 0, 0, 0
local raycastResult = world.raycast({
    startX = eyePos.x,
    startY = eyePos.y, 
    startZ = eyePos.z,
    endX = targetX + 0.5,
    endY = targetY + 0.5,
    endZ = targetZ + 0.5
})
if raycastResult ~= nil then
    if raycastResult.type == "block" then
        local block = world.getBlock(raycastResult.blockPos.x, raycastResult.blockPos.y, raycastResult.blockPos.z)
        player.addMessage("Block: " .. raycastResult.blockPos.x .. ", " .. raycastResult.blockPos.y .. ", " .. raycastResult.blockPos.z .. " | " .. block.name)
    elseif raycastResult.type == "entity" then
        player.addMessage("Entity: " .. raycastResult.data.name)
    elseif raycastResult.type == "miss" then
        player.addMessage("Miss")
    end
end
```

## `getBreakingBlocksInfo()`

Returns information about currently breaking blocks.

**Returns:**

* (table) List of breaking block info with `progress` 0->10, `blockpos` ([BlockPos](../datatypes/blockPos.md)), `id`, and `updatedRenderTick`.

**Example Usage:**

```lua
local world = require("world")
local brokeInfo
registerClientTick(function ()
    brokeInfo = world.getBreakingBlocksInfo()
    for _, info in ipairs(brokeInfo) do
        print("Block breaking: " .. info.progress .. " at " .. info.blockpos.x .. ", " .. info.blockpos.y .. ", " .. info.blockpos.z)
    end
end)
```
