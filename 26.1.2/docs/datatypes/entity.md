---
description: Returned information about entities
icon: user-alien
---

# Entity

## Variables

**id** (_number_) - numeric entity ID

**uuid** (_string_)

**name** (_string_)

**identifier** (_string_) - entity type identifier (e.g. "minecraft:sheep")

**display\_name** (_string_)

**type** (_string_)

**x** (_number_) - X position

**y** (_number_) - Y position

**z** (_number_) - Z position

**pos** / **position** ([vector3](../datatypes/vector3.md)) - position vector

**blockpos** ([blockPos](blockPos.md)) - block position

**box** ([Box](box.md))

**velocity\_x** (_number_)

**velocity\_y** (_number_)

**velocity\_z** (_number_)

**velocity** ([vector3](../datatypes/vector3.md))

**gravity** (_number_)

**horizontal\_collision** (_boolean_)

**vertical\_collision** (_boolean_)

**hurt\_marked** (_boolean_)

**controlled\_venicle** ([Entity](entity.md)) - the vehicle entity is controlling (if any)

**nearest\_view\_direction** ([Direction](direction.md))

**direction** ([Direction](direction.md))

**touching\_unloaded\_chunk** (_boolean_)

**width** (_number_)

**height** (_number_)

**yaw** (_number_)

**pitch** (_number_)

**is\_swimming** (_boolean_)

**is\_on\_ground** (_boolean_)

**is\_touching\_water** (_boolean_)

**is\_in\_lava** (_boolean_)

**is\_in\_powder\_snow** (_boolean_)

**is\_sneaking** (_boolean_)

**is\_sprinting** (_boolean_)

**is\_crouching** (_boolean_)

**age** (_number_)

**distance\_to\_player** (_number_)

**passengers** (_table list of [Entities](entity.md)_)

**skin** (_string_) - player skin texture (only for Player entities)

**gamemode** (_string_) - player gamemode (only for Player entities)

**is\_blocking** (_boolean_) - entity blocking with shield (LivingEntity only)

**health** (_number_)

**max\_health** (_number_)

**is\_alive** (_boolean_)

**is\_child** / **is\_baby** (_boolean_)

**main\_hand** ([_ItemData_](item.md))

**off\_hand** ([_ItemData_](item.md))

**head** ([_ItemData_](item.md))

**chest** ([_ItemData_](item.md))

**legs** ([_ItemData_](item.md))

**feet** ([_ItemData_](item.md))

**item** ([_ItemData_](item.md)) (has only for Item entity and ItemFrame entity)

**active\_effects** (_table list_) - active potion effects with fields: type, duration, amplifier

**nbt** (_string_) - entity NBT data

## Functions

### `entity:teleport(x, y, z, onGround)`

Teleport the player entity. Only works on the local player.

**Parameters:**
* `x` (number)
* `y` (number)
* `z` (number)
* `onGround` (boolean, optional) - default true

**Returns:**
* (boolean)

**Example Usage:**
```lua
local player = require("player")
player.entity:teleport(0, 100, 0, true)
```

## Settable Properties

The following properties can be modified on the local player entity:

```lua
local player = require("player")

-- Set position
player.entity.x = 100
player.entity.y = 64
player.entity.z = 100

-- Or set via vector
local creator = require("creator")
player.entity.pos = creator.createVector3(100, 64, 100)

-- Set velocity
player.entity.velocity_x = 0
player.entity.velocity_y = 0.5
player.entity.velocity_z = 0
```
