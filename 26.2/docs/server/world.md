---
icon: earth-africa
---

# World

Server-side world object. Returned by [server.getLevel(...)](/server/server.md#getlevelidentifier).

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel("minecraft:overworld")
```

## `getBlock(x, y, z)` / `getBlockState(x, y, z)`

Gets information about a block by coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.

**Returns:**

* ([Block data](/common/datatypes/block.md)) Return block information

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local blockInfo = world.getBlock(1, 1, 1)
-- getBlockState is an alias for getBlock
local blockInfo2 = world.getBlockState(1, 1, 1)
```

## `getBlockEntity(x, y, z)`

Gets the block entity at the specified coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.

**Returns:**

* ([Block entity](/common/datatypes/blockEntity.md)) Return block entity or `nil`.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local blockEntity = world.getBlockEntity(1, 1, 1)
if blockEntity then
    print(blockEntity.javaClass)
end
```

## `getDimension()`

Returns the dimension identifier of this world.

**Returns:**

* (string) Dimension id, example: `minecraft:overworld`.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
print(world.getDimension())
```

## `setBlock(x, y, z, state)`

Sets a block at the desired coordinates. Accepts different argument combinations:

* `world.setBlock(x, y, z, blockState)` - coordinates and [block data](/common/datatypes/block.md).
* `world.setBlock(x, y, z, id)` - coordinates and raw block state id.
* `world.setBlock({x = x, y = y, z = z, id = id})` - table with position and raw id.
* `world.setBlock(blockPos, blockState)` - [blockpos](/common/datatypes/blockPos.md) and [block data](/common/datatypes/block.md).
* `world.setBlock(blockPos)` or `world.setBlock(blockPos, id)` - blockpos and optional raw id.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

world.setBlock(1, 1, 1, 1) -- Set stone to 1, 1, 1

local state = world.getBlock(0, 0, 0)
world.setBlock(2, 2, 2, state)
```

## `isBlockLoaded(x, y, z)`

Checks if the chunk at the specified coordinates is loaded.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.

**Returns:**

* (boolean)

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local loaded = world.isBlockLoaded(1, 1, 1)
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
local server = require("server")
local world = server.getLevel()
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
local server = require("server")
local world = server.getLevel()
local light = world.getLightSky(0, 64, 0)
print("Sky light: " .. light)
```

## `getEntities()`

Returns a list of all entities in the world.

**Returns:**

* table ([List of entities](/common/datatypes/entity.md)) Return table (list) of entities

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local entities = world.getEntities()
for index, entity in ipairs(entities) do
    print(string.format("Entity %d: %s", index, entity.name))
end
```

## `getLivingEntities()`

Returns a list of living entities in the world.

**Returns:**

* table ([List of entities](/common/datatypes/entity.md)) Return table (list) of entities

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local entities = world.getLivingEntities()
for index, entity in ipairs(entities) do
    print(string.format("Entity %d: %s", index, entity.name))
end
```

## `getArmorStandEntities()`

Returns a list of all armor stand entities in the world.

**Returns:**

* (table) List of armor stand [entities](/common/datatypes/entity.md).

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local armorStands = world.getArmorStandEntities()
for _, stand in ipairs(armorStands) do
    print(stand.name)
end
```

## `getEntitiesInBox(box)`

Returns a list of entities within the specified box.

**Parameters:**

* `box` ([box](/common/datatypes/box.md)) - Search box.

**Returns:**

* table ([List of entities](/common/datatypes/entity.md)) Return table (list) of entities

**Example Usage:**

```lua
local server = require("server")
local creator = require("creator")
local world = server.getLevel()

local box = creator.createBox(0, 64, 0, 10, 74, 10)
local entities = world.getEntitiesInBox(box)
for _, ent in ipairs(entities) do
    print(ent.name)
end
```

## `getArmorStandEntitiesInBox(box)`

Returns a list of armor stand entities within the specified box.

**Parameters:**

* `box` ([box](/common/datatypes/box.md)) - The search box.

**Returns:**

* (table) List of armor stand [entities](/common/datatypes/entity.md).

**Example Usage:**

```lua
local server = require("server")
local creator = require("creator")
local world = server.getLevel()

local box = creator.createBox(0, 64, 0, 10, 74, 10)
local armorStands = world.getArmorStandEntitiesInBox(box)
for _, stand in ipairs(armorStands) do
    print("Found armor stand: " .. stand.name)
end
```

## `getEntityById(id)`

Returns an entity by its id.

**Parameters:**

* `id` (number) - Entity id.

**Returns:**

* ([Entity](/common/datatypes/entity.md)) Return entity or `nil`.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local entity = world.getEntityById(0)
if entity then
    print(entity.name)
end
```

## `spawnEntity(type, x, y, z [, yaw, pitch])` / `world.spawn(...)`

Spawns a new entity in the world.

**Parameters:**

* `type` (string or EntityType) - Entity type identifier (`minecraft:sheep`) or entity type from the [entities registry](/common/libs/entities.md).
* `x` (number) - X coordinate.
* `y` (number) - Y coordinate.
* `z` (number) - Z coordinate. Coordinates can also be passed as three numbers or as a [vector3](/common/datatypes/vector3.md).
* `yaw` (number) - Optional. Yaw rotation (default `0`).
* `pitch` (number) - Optional. Pitch rotation (default `0`).

**Returns:**

* ([Entity](/common/datatypes/entity.md)) Spawned entity or `nil`.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

local sheep = world.spawnEntity("minecraft:sheep", 100, 70, 100)
if sheep then
    print("Spawned: " .. sheep.name)
end
```

## `removeEntity(entity)` / `world.despawn(...)`

Removes an entity from the world without drops or death animation.

**Parameters:**

* `entity` ([Entity](/common/datatypes/entity.md) or number) - Entity object, raw entity userdata or numeric entity ID.

**Returns:**

* (boolean) `true` if the entity was removed, `false` if not found or already dead.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

-- Remove by entity object
for _, entity in ipairs(world.getEntities()) do
    if entity.identifier == "minecraft:creeper" then
        world.removeEntity(entity)
    end
end

-- Remove by numeric ID
world.removeEntity(123)
```

## `getOutlineBoxes(x, y, z, blockState)`

Gets outline shape boxes for a block state at the desired coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.
* `blockState` ([Block data](/common/datatypes/block.md))

**Returns:**

* table ([boxes](/common/datatypes/box.md))

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local blockState = world.getBlock(1, 1, 1)
if blockState then
    local outlines = world.getOutlineBoxes(1, 1, 1, blockState)
    if outlines then
        for i = 1, #outlines do
            local box = outlines[i]

            local minX = box.minX
            local minY = box.minY
            local minZ = box.minZ

            local maxX = box.maxX
            local maxY = box.maxY
            local maxZ = box.maxZ
        end
    end
end
```

## `getCollisionBoxes(x, y, z, blockState)`

Gets collision shape boxes for a block state at the desired coordinates.

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.
* `blockState` ([Block data](/common/datatypes/block.md))

**Returns:**

* table ([boxes](/common/datatypes/box.md))

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local blockState = world.getBlock(1, 1, 1)
if blockState then
    local collisions = world.getCollisionBoxes(1, 1, 1, blockState)
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

## `getBlocksInBox(box)` / `getBlocksInBox(pos1, pos2)`

Gets information about blocks by box or two positions.

**Parameters:**

* `box` ([box](/common/datatypes/box.md)).
* `pos1` ([blockpos](/common/datatypes/blockPos.md)).
* `pos2` ([blockpos](/common/datatypes/blockPos.md)).

**Returns:**

* (table) List of entries with `pos` ([blockpos](/common/datatypes/blockPos.md)) and `state` ([Block data](/common/datatypes/block.md)).

**Example Usage:**

```lua
local server = require("server")
local creator = require("creator")
local world = server.getLevel()

local min = creator.createBlockPos(0, 64, 0)
local max = creator.createBlockPos(16, 80, 16)
local blocks = world.getBlocksInBox(min, max)
for index, value in ipairs(blocks) do
    local pos = value.pos
    local block = value.state
end
```

## `getBlocksFromList(positions)`

Gets information about blocks from a list of positions.

**Parameters:**

* `positions` (table) - Table of positions. Each position is `{x, y, z}` or `{x = x, y = y, z = z}`.

**Returns:**

* (table) List of entries with `pos` ([blockpos](/common/datatypes/blockPos.md)) and `state` ([Block data](/common/datatypes/block.md)).

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

local positions = {
    {0, 64, 0},
    {x = 5, y = 65, z = 5}
}
local blocks = world.getBlocksFromList(positions)
for index, value in ipairs(blocks) do
    print(value.pos.x, value.pos.y, value.pos.z, value.state.name)
end
```

## `playSound(x, y, z, soundIdentifier [, volume, pitch])`

Plays a sound at the specified position for all nearby players. Position can also be passed as a [vector3](/common/datatypes/vector3.md).

**Parameters:**

* `x` (number) - X cordinate.
* `y` (number) - Y cordinate.
* `z` (number) - Z cordinate.
* `soundIdentifier` (string) - example: `minecraft:block.anvil.place`
* `volume` (number) - Percent volume, `100` is full volume (default `100`).
* `pitch` (number) - Sound pitch (default `1`).

**Returns:**

* (boolean)

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
world.playSound(0, 64, 0, "minecraft:block.anvil.place", 100, 1)
```

## `executeCommand(command [, x, y, z])` / `world.runCommand(...)`

Executes a server command as a virtual source with full operator permissions (`PermissionSet.ALL_PERMISSIONS`). Command output is suppressed. The leading `/` is optional.

**Parameters:**

* `command` (string) - Server command without the leading slash, example: `summon minecraft:pig 0 70 0`.
* `x`, `y`, `z` (number) - Optional. Reference position for relative coordinates (`~`) in the command.

**Returns:**

* Multiple values:
  * Result:
    * ([Entity](/common/datatypes/entity.md)) - If the command spawned exactly one entity (for example `summon`).
    * table ([List of entities](/common/datatypes/entity.md)) - If several entities were spawned.
    * boolean `true` - If no new entities were detected.
    * boolean `false` - If command execution failed.
  * (number) - Numeric result of the command (brigadier result) or `nil`.
  * (string) - Error message if execution failed, otherwise `nil`.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

-- Summon returns the spawned entity with all fields
local pig = world.executeCommand("summon minecraft:pig ~ ~ ~")
if pig then
    print("Spawned: " .. pig.name)
    pig.health = 10.0
end

-- Generic commands return true + numeric result
local ok, result = world.executeCommand("time set day")
if not ok then
    print("Command failed")
end
```

## `spawnEntityFor(player, type, x, y, z [, yaw, pitch])` / `world.spawnPrivateEntity(...)`

Spawns an entity visible **only to the given player**. The entity is not added to the world: it does not tick and other players never see it. Use [updateEntityFor](#updateentityforplayer-entity) to sync changes and [removeEntityFor](#removeentityforplayer-entity--entityid) to hide it.

**Parameters:**

* `player` ([Entity](/common/datatypes/entity.md), number or string) - Target player (entity object, entity id or name/UUID).
* `type` (string or EntityType) - Entity type identifier (`minecraft:sheep`).
* `x`, `y`, `z` (number) - Coordinates. Also accepts a [vector3](/common/datatypes/vector3.md).
* `yaw` (number) - Optional. Yaw rotation (default `0`).
* `pitch` (number) - Optional. Pitch rotation (default `0`).

**Returns:**

* ([Entity](/common/datatypes/entity.md)) The private entity.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

local player = server.getPlayer("Neki_play")
local ghost = world.spawnEntityFor(player, "minecraft:armor_stand", 0, 70, 0)
ghost.customName = "Boo!"
world.updateEntityFor(player, ghost)
```

## `updateEntityFor(player, entity)` / `world.updatePrivateEntity(...)`

Synchronizes a private entity with the target player's client: position/rotation, head rotation, metadata (custom name, invisibility, ...), equipment and active effects. Call it after changing entity fields — private entities are not ticked by the server, so nothing is synced automatically.

**Parameters:**

* `player` ([Entity](/common/datatypes/entity.md), number or string) - Target player.
* `entity` ([Entity](/common/datatypes/entity.md)) - Private entity returned by [spawnEntityFor](#spawnentityforplayer-type-x-y-z--yaw-pitch).

**Returns:**

* (boolean) `true` on success.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()
local player = server.getPlayer("Neki_play")

local ghost = world.spawnEntityFor(player, "minecraft:zombie", 10, 70, 10)
ghost.health = 5
ghost.add_effect("minecraft:speed")
world.updateEntityFor(player, ghost)
```

## `removeEntityFor(player, entity|entityId)` / `world.removePrivateEntity(...)`

Hides a private entity from the given player (removal packet).

**Parameters:**

* `player` ([Entity](/common/datatypes/entity.md), number or string) - Target player.
* `entity` ([Entity](/common/datatypes/entity.md) or number) - Private entity or its id.

**Returns:**

* (boolean) `true` if the packet was sent.

**Example Usage:**

```lua
world.removeEntityFor(player, ghost)
```

## `setBlockFor(player, x, y, z, blockState)` / `world.setPrivateBlock(...)`

Shows a **fake block** only to the given player. The real block in the world is not changed. Accepts `(x, y, z, blockState)` or `(blockPos, blockState)` argument combinations.

**Parameters:**

* `player` ([Entity](/common/datatypes/entity.md), number or string) - Target player.
* `x`, `y`, `z` (number) - Coordinates (or a [blockpos](/common/datatypes/blockPos.md)).
* `blockState` ([Block data](/common/datatypes/block.md))

**Returns:**

* (boolean)

**Example Usage:**

```lua
local server = require("server")
local creator = require("creator")
local blocks = require("blocks")
local world = server.getLevel()
local player = server.getPlayer("Neki_play")

local diamondBlock = blocks.getBlock("minecraft:diamond_block")
world.setBlockFor(player, 0, 65, 0, diamondBlock)
```

## `resetBlockFor(player, x, y, z)` / `world.resetPrivateBlock(...)`

Restores the real block state for the given player after `setBlockFor`. Accepts `(x, y, z)` or `(blockPos)`.

**Parameters:**

* `player` ([Entity](/common/datatypes/entity.md), number or string) - Target player.
* `x`, `y`, `z` (number) - Coordinates (or a [blockpos](/common/datatypes/blockPos.md)).

**Returns:**

* (boolean)

**Example Usage:**

```lua
world.resetBlockFor(player, 0, 65, 0)
```

## `raycast(obj)`

Return raycast result.

**Parameters:**

* `obj` (table).
  * `startX`, `startY`, `startZ` (number) - Ray start point.
  * `endX`, `endY`, `endZ` (number) - Ray end point.
  * `include_fluid` (boolean) - Optional. Include fluids (default `false`).
  * `include_entity` (boolean) - Optional. Include entities (default `false`).

**Returns:**

* ([Raycast](/common/datatypes/raycast.md)) Raycast result or `nil` on miss.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

local raycastResult = world.raycast({
    startX = 0, startY = 90, startZ = 0,
    endX = 0, endY = 40, endZ = 0,
    include_entity = true
})
if raycastResult ~= nil then
    if raycastResult.type == "block" then
        print("Hit block at", raycastResult.blockPos.x, raycastResult.blockPos.y, raycastResult.blockPos.z)
    elseif raycastResult.type == "entity" then
        print("Hit entity:", raycastResult.data.name)
    end
end
```

## `raycastFromRotation(obj)`

Casts a ray in a direction defined by yaw and pitch. Return raycast result.

**Parameters:**

* `obj` (table).
  * `startX`, `startY`, `startZ` (number) - Ray start point.
  * `yaw` (number) - Yaw rotation.
  * `pitch` (number) - Pitch rotation.
  * `range` (number) - Max ray length.
  * `include_fluid` (boolean) - Optional. Include fluids (default `false`).
  * `include_entity` (boolean) - Optional. Include entities (default `false`).

**Returns:**

* ([Raycast](/common/datatypes/raycast.md)) Raycast result or `nil` on miss.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

local hit = world.raycastFromRotation({
    startX = 0, startY = 90, startZ = 0,
    yaw = 0, pitch = 45,
    range = 20,
    include_fluid = true
})
if hit ~= nil then
    print(hit.type)
end
```

## `raycastToBlocksFromId(obj)`

Casts a ray that only checks blocks from the given list of raw block state ids. Return raycast result.

**Parameters:**

* `obj` (table).
  * `startX`, `startY`, `startZ` (number) - Ray start point.
  * `endX`, `endY`, `endZ` (number) - Ray end point.
  * `blocks` (table) - Optional list of raw block state ids.

**Returns:**

* ([Raycast](/common/datatypes/raycast.md)) Raycast result or `nil` on miss.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

local hit = world.raycastToBlocksFromId({
    startX = 0, startY = 90, startZ = 0,
    endX = 0, endY = 40, endZ = 0,
    blocks = { 1 } -- stone state id
})
if hit ~= nil then
    print("Found target block")
end
```

## `raycastToBlocksFromIdentifier(obj)`

Casts a ray that only checks blocks from the given list of block identifiers. Return raycast result.

**Parameters:**

* `obj` (table).
  * `startX`, `startY`, `startZ` (number) - Ray start point.
  * `endX`, `endY`, `endZ` (number) - Ray end point.
  * `blocks` (table) - Optional list of block identifiers (`minecraft:diamond_ore`).

**Returns:**

* ([Raycast](/common/datatypes/raycast.md)) Raycast result or `nil` on miss.

**Example Usage:**

```lua
local server = require("server")
local world = server.getLevel()

local hit = world.raycastToBlocksFromIdentifier({
    startX = 0, startY = 90, startZ = 0,
    endX = 0, endY = 40, endZ = 0,
    blocks = { "minecraft:diamond_ore", "minecraft:ancient_debris" }
})
if hit ~= nil then
    print("Found ore!")
end
```
