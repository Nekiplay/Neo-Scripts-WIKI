---
icon: user-alien
---

# Player

## Variables

### [input](input.md)

### [inventory](inventory.md)

### [entity](../../datatypes/entity.md)

### [fishHook](../../datatypes/entity.md)

## Functions

### `addMessage(text)`

Add message to chat.

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.addMessage("Hypixel Cry - Only me see this")
local ComponentBuilder = require("textbuilder")
local message = ComponentBuilder.new("Hello! ")
    :color("white")
    :append(
        ComponentBuilder.new("[Teleport]")
            :color("gold")
            :bold(true)
            :underlined(true)
            :clickRunCommand("/spawn")
            :hoverText("§eClick here to teleport!")
    )
    :append(
        ComponentBuilder.new(" | ")
            :color("gray")
    )
    :append(
        ComponentBuilder.new("[Copy IP]")
            :color("#55FFFF")
            :clickCopyToClipboard("hypixel.net")
            :hoverText(
                ComponentBuilder.new("Click to copy")
                    :color("yellow")
                    :italic(true)
            )
    )
    :build()
	
player.addMessage(message)
```

### `sendMessage(text)`

Send message to server.

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.sendMessage("Hypixel Cry - All see this")
```

### `sendCommand(text)`

Send command to server.

**Returns:**

* (boolean) Return `true` if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.sendCommand("/warp hub")
```

### `getProfile()`

Returns the player profile.

**Returns:**

* (string) Profile name.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local name = player.getProfile()
```

### `getProfileId()`

Returns the player profile id.

**Returns:**

* (string) Profile id.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local id = player.getProfileId()
```

### `getName()`

Returns the player name.

**Returns:**

* (string) Player name.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local name = player.getName()
```

### `getRank()`

Returns the player rank.

**Returns:**

* (string) Player rank.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local rank = player.getRank()
```

### `getRotation()`

Returns the player rotation.

**Returns:**

* (table) - Position table (yaw, pitch)

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local rotation = player.getRotation()
local yaw = rotation.yaw -- Number
local pitch = rotation.pitch -- Number
```

### `setRotation(yaw, pitch)`

Returns the player rotation.

**Parameters:**

* `yaw` (number) - Player yaw.
* `pitch` (number) - Player yaw.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.setRotation(90, 90)
```

### `getPosition()`

Returns the player vector3.

**Returns:**

* [vector3](../../datatypes/vector3.md).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pos = player.getPosition()
local x = pos.x -- Number
local y = pos.y -- Number
local z = pos.z -- Number
```

### `getLocation()`

Returns the player location.

**Returns:**

* (string) Player location.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local location = player.getLocation()
```

### `getRawLocation()`

Returns the player raw location.

**Returns:**

* (string) Player location.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local location = player.getRawLocation()
```

### `getArea()`

Returns the player area.

**Returns:**

* (string) Player area.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local area = player.getArea()
```

### `getPurse()`

Returns the player purse.

**Returns:**

* (number) Player purse.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local purse = player.getPurse()
```

### `getBits()`

Returns the player bits.

**Returns:**

* (number) Player bits.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local bits = player.getBits()
```

### `getHealth()`

Returns the player health.

**Returns:**

* (number) Player health.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local health = player.getHealth()
```

### `getMaxHealth()`

Returns the player max health.

**Returns:**

* (number) Player max health.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local maxHealth = player.getMaxHealth()
```

### `getMana()`

Returns the player mana.

**Returns:**

* (number) Player mana.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local mana = player.getMana()
```

### `getMaxMana()`

Returns the player max mana.

**Returns:**

* (number) Player max mana.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local maxMana = player.getMaxMana()
```

### `getDefence()`

Returns the player defence.

**Returns:**

* (number) Player defence.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local defence = player.getDefence()
```

### `getSpeed()`

Returns the player speed.

**Returns:**

* (number) Player speed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local speed = player.getSpeed()
```

### `getTitle()`

Returns the current title text shown on screen.

**Returns:**

* (string) Title text.

**Example Usage:**

```lua
local player = require("player")
local title = player.getTitle()
print("Current title:", title)
```

### `getSubTitle()`

Returns the current subtitle text shown on screen.

**Returns:**

* (string) Subtitle text.

**Example Usage:**

```lua
local player = require("player")
local subtitle = player.getSubTitle()
print("Current subtitle:", subtitle)
```

### `getActionBar()`

Returns the current action bar text.

**Returns:**

* (string) Action bar text.

**Example Usage:**

```lua
local player = require("player")
local actionBar = player.getActionBar()
print("Action bar:", actionBar)
```

### `getAir()`

Returns the player oxygen.

**Returns:**

* (number) Player oxygen.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local oxygen = player.getAir()
```

### `getMaxAir()`

Returns the player max oxygen.

**Returns:**

* (number) Player max oxygen.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local max_oxygen = player.getMaxAir()
```

### `getCold()`

Returns the player cold in glacite tunnels.

**Returns:**

* (number) Player cold.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local cold = player.getCold()
```

### `isSneaking()`

Returns the player is sneaking.

**Returns:**

* (boolean) is player sneaking.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local isSneaking = player.isSneaking()
```
### `isSprinting()`

Returns the player is sprinting.

**Returns:**

* (boolean) is player sprinting.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local isSprinting = player.isSprinting()
```

### `isOnGround()`

Returns the player is on ground.

**Returns:**

* (boolean) is player on ground.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local isOnGround = player.isOnGround()
```

### `isOnSkyBlock()`

Returns the player is on skyblock.

**Returns:**

* (boolean) is player on skyblock.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local isOnSkyBlock = player.isOnSkyBlock()
```

Returns scoreboard lines.

### `getPet()`

**Returns:**

* (table) pet info.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pet = player.getPet()
local name = pet.name
local exp = pet.exp
local type = pet.type
local item = pet.item
```

### `getScoreBoardLines()`

**Returns:**

* (table) list of lines.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local scoreboard = player.getScoreBoardLines()
for index, line in ipairs(scoreboard) do
    player.addMessage(line)
end
```

### `getTab()`

**Returns:**

* (table) list of lines.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local tab = player.getTab()
if tab.header then
    player.addMessage(tab.header)
end    

if tab.body then
    for index, line in ipairs(tab.body) do
        player.addMessage(line)
    end
end

if tab.footer then
    player.addMessage(tab.footer)
end
```

### `getEyePosition()`

Returns player eye position.

**Returns:**

* (table) eye position (x, y, z).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local eyePostion = player.getEyePosition()
local x = eyePostion.x -- Number
local y = eyePostion.y -- Number
local z = eyePostion.z -- Number
```

### `addToast(title, description, time)`

Returns player eye position.

**Parameters:**

* title (string)
* description (title)
* time (number milliseconds)

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.addToast("Hypixel Cry", "Script has new version", 10000) -- Show toast to 10 seconds
```

### `getLookEndPos(number)`

Returns player eye end position.

**Parameters:**

* `distance` (number) - Distance from the player's view.

**Returns:**

* (table) eye end position (x, y, z).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local lookEndPosition = player.getLookEndPos(5.0)
local x = lookEndPosition.x -- Number
local y = lookEndPosition.y -- Number
local z = lookEndPosition.z -- Number
```

### `getLookEndPos(table)`

Returns player eye end position.

**Parameters:**

* `table` (x, y, z) - Table with end point coordinates.

**Returns:**

* (table) eye end position (x, y, z).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local look = {
   x = 1,
   y = 1,
   z = 1
}

local lookEndPosition = player.getLookEndPos(look)
local x = lookEndPosition.x -- Number
local y = lookEndPosition.y -- Number
local z = lookEndPosition.z -- Number
```

### `raycast(number)`

Returns raycast result from eye.

**Parameters:**

* `number` - Raycast distances from eyes.

**Returns:**

**Global**

* (table) Result of raycast.

**If block**

* (table) (type, x, y, z) Result of raycast.

**If entity**

* (table) (type, [entityData](../../datatypes/entity.md)) Result of raycast.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local raycastResult = player.raycast(4.5)
if raycastResult == nil then
   print("MISS")
else
   local resultType = raycastResult.type
   if resultType == "block" then
      local x = raycastResult.blockPos.x -- Number
      local y = raycastResult.blockPos.y -- Number
      local z = raycastResult.blockPos.z -- Number
   elseif resultType == "entity" then
      local entityData = raycastResult.data
   end
end
```

### `swingHand(offHand)`

Swing player hand.

**Parameters:**

* `boolean` - Use off hand (optional, default false).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
registerClientTick(function()
    player.swingHand() -- swing main hand
    player.swingHand(true) -- swing off hand
end)
```

### `isHasLineOfSight(entity)`

Check if player has line of sight to an entity.

**Parameters:**

* `entity` ([Entity](../../datatypes/entity.md)).

**Returns:**

* (boolean)

**Example Usage:**

```lua
local player = require("player")
local entities = require("world").getEntities()
for _, entity in ipairs(entities) do
    if player.isHasLineOfSight(entity) then
        print("Can see:", entity.name)
    else
        print("Cannot see:", entity.name)
    end
end
```

### `raycastToBlocksFromId(distance, blocks)`

Raycast targeting specific block IDs (useful for block scanning).

**Parameters:**

* `distance` (number) - max distance.
* `blocks` (table) - list of block IDs to target.

**Returns:**

* ([Raycast](../../datatypes/raycast.md) or nil).

**Example Usage:**

```lua
local player = require("player")
local result = player.raycastToBlocksFromId(4.5, {1, 56}) 
if result and result.type == "block" then
    print("Found block at", result.blockPos.x, result.blockPos.y, result.blockPos.z)
end
```

### `raycastToBlocksFromId(distance, blockIds)`

Raycast targeting specific blocks by numeric ID.

**Parameters:**

* `distance` (number) - max distance.
* `blockIds` (table) - list of block numeric IDs.

**Returns:**

* ([Raycast](../../datatypes/raycast.md) or nil).

### `raycastToBlocksFromIdentifier(distance, identifiers)`

Raycast targeting specific blocks by identifier strings.

**Parameters:**

* `distance` (number) - max distance.
* `identifiers` (table) - list of block identifier strings (e.g. "minecraft:stone").

**Returns:**

* ([Raycast](../../datatypes/raycast.md) or nil).

**Example Usage:**

```lua
local player = require("player")
local result = player.raycastToBlocksFromIdentifier(4.5, {"minecraft:stone", "minecraft:diamond_ore"})
if result and result.type == "block" then
    print("Found block at", result.blockPos.x, result.blockPos.y, result.blockPos.z)
end
```

### `raycastToEntity(distance)`

Raycast targeting only entities (ignores blocks).

**Parameters:**

* `distance` (number) - max distance.

**Returns:**

* ([Raycast](../../datatypes/raycast.md) or nil).

**Example Usage:**

```lua
local player = require("player")
local hit = player.raycastToEntity(4.5)
if hit and hit.type == "entity" then
    print("Looking at entity:", hit.data.name)
end
```

### `getBossBar()`

Returns boss bar information.

**Returns:**

* (table) List of boss bars with fields: uuid, name, percent, color, overlay, shouldCreateFog, shouldDarkenScreen, shouldPlayBossMusic.

**Example Usage:**

```lua
local player = require("player")
local bars = player.getBossBar()
for _, bar in ipairs(bars) do
    print(bar.name, bar.percent)
end
```

### `getDirectionFromYawPitch(yaw, pitch)`

Calculate direction vector from yaw/pitch angles.

**Parameters:**

* `yaw` (number).
* `pitch` (number).

**Returns:**

* (table) with `direction` ([Vector3](../../datatypes/vector3.md)).

**Example Usage:**

```lua
local player = require("player")
local dir = player.getDirectionFromYawPitch(45, 30)
print(dir.direction.x, dir.direction.y, dir.direction.z)
```

### `setServerRotation(yaw, pitch, movementCorrection, silentMovementCorrection)`

Set rotation server-side only (silent/ghost rotation).

**Parameters:**

* `yaw` (number).
* `pitch` (number).
* `movementCorrection` (boolean, optional) - default true.
* `silentMovementCorrection` (boolean, optional) - default false.

**Example Usage:**

```lua
local player = require("player")
player.setServerRotation(0, 90) -- look straight down server-side
```

### `getServerRotation()`

Get the current silent/server rotation.

**Returns:**

* (table) { yaw, pitch }.

**Example Usage:**

```lua
local rot = player.getServerRotation()
print("Server yaw:", rot.yaw, "pitch:", rot.pitch)
```
