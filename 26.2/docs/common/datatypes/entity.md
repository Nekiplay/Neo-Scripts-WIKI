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

**custom\_name** (_string_) - custom name of the entity or `nil`

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

**custom\_name\_visible** (_boolean_) - whether the custom name is always visible

**no\_gravity** (_boolean_)

**invulnerable** (_boolean_)

**glowing** (_boolean_) - glowing outline state

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

The following properties can be modified on the entity:

### Position and movement

* **x**, **y**, **z** (_number_) - set position component
* **pos** / **position** ([vector3](../datatypes/vector3.md)) - set position via vector
* **velocity\_x**, **velocity\_y**, **velocity\_z** (_number_) - set velocity component
* **velocity** ([vector3](../datatypes/vector3.md)) - set velocity via vector

For the local player a movement packet is sent to the server, for other entities the change is client-side only.

### Rotation

* **yaw** (_number_)
* **pitch** (_number_)

### Common properties (any entity)

* **custom\_name** (_string_ or [Component](../datatypes/component.md) or `nil`) - sets or removes the custom name
* **custom\_name\_visible** (_boolean_)
* **is\_sneaking** (_boolean_)
* **is\_sprinting** (_boolean_)
* **is\_swimming** (_boolean_)
* **no\_gravity** (_boolean_)
* **invulnerable** (_boolean_)
* **glowing** (_boolean_)

### LivingEntity only

* **health** (_number_) - clamped between `0` and `max_health`
* **main\_hand**, **off\_hand** ([Item](../datatypes/item.md))
* **head**, **chest**, **legs**, **feet** ([Item](../datatypes/item.md))

### AgeableMob only

* **is\_baby** / **is\_child** (_boolean_)

**Example Usage:**

```lua
local player = require("player")
local creator = require("creator")

-- Set position
player.entity.x = 100
player.entity.y = 64
player.entity.z = 100

-- Or set via vector
player.entity.pos = creator.createVector3(100, 64, 100)

-- Set velocity
player.entity.velocity_x = 0
player.entity.velocity_y = 0.5
player.entity.velocity_z = 0

-- Set rotation
player.entity.yaw = 90
player.entity.pitch = 0

-- Set common properties
local world = require("world")
local entity = world.getEntityById(123)
if entity then
    entity.custom_name = "§6My Entity"
    entity.custom_name_visible = true
    entity.is_sneaking = false
    entity.is_sprinting = true
    entity.is_swimming = false
    entity.no_gravity = true
    entity.invulnerable = false
    entity.glowing = true
end

-- LivingEntity only
entity.health = 10
entity.main_hand = nil -- clear item in main hand
entity.head = nil      -- clear helmet

-- AgeableMob only
entity.is_baby = true
```

