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

**inventory** ([Inventory](inventory.md)) - player inventory (only for Player entities)

**is\_invisible** / **invisible** (_boolean_) - whether the entity is invisible

**nbt** (_string_) - entity NBT data

### ArmorStand only

**small** (_boolean_)

**marker** (_boolean_) - marker armor stand (no hitbox, no interaction)

**show\_arms** (_boolean_)

**no\_base\_plate** / **no\_baseplate** (_boolean_)

**head\_pose**, **body\_pose**, **left\_arm\_pose**, **right\_arm\_pose**, **left\_leg\_pose**, **right\_leg\_pose** (_table_) - pose rotations as `{x = number, y = number, z = number}` in degrees

## Functions

### `entity:add_effect(id[, duration][, amplifier])`

Adds a potion effect to the entity (LivingEntity only).

**Parameters:**
* `id` (_string_) - effect identifier (e.g. `"minecraft:speed"`, namespace can be omitted: `"speed"`)
* `duration` (_number_, optional) - duration in ticks, `-1` for infinite (default `-1`)
* `amplifier` (_number_, optional) - amplifier level (default `0`)

**Returns:**
* (_boolean_) - `true` if the effect was applied

### `entity:remove_effect([id])`

Removes potion effects from the entity (LivingEntity only).

**Parameters:**
* `id` (_string_, optional) - effect identifier to remove; if omitted, all effects are removed

**Returns:**
* (_boolean_)

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

**Effects Example Usage:**
```lua
local player = require("player")

-- Infinite Speed II
player.entity:add_effect("minecraft:speed", -1, 1)

-- Jump Boost for 30 seconds (600 ticks)
player.entity:add_effect("jump_boost", 600)

-- Remove speed only
player.entity:remove_effect("minecraft:speed")

-- Remove all effects
player.entity:remove_effect()

-- Inventory access
local inv = player.entity.inventory
if inv then
    inv:add_item(require("items").getFromIdentifier("minecraft:diamond"), 64)
end
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

### ArmorStand only

* **invisible** / **is\_invisible** (_boolean_) - makes the armor stand invisible
* **small** (_boolean_) - small model
* **marker** (_boolean_) - marker (no hitbox)
* **show\_arms** (_boolean_)
* **no\_base\_plate** / **no\_baseplate** (_boolean_)
* **head\_pose**, **body\_pose**, **left\_arm\_pose**, **right\_arm\_pose**, **left\_leg\_pose**, **right\_leg\_pose** (_table_ or [vector3](../datatypes/vector3.md)) - pose rotations in degrees, e.g. `{x = 0, y = 45, z = 0}`

**Example Usage:**

```lua
local player = require("player")
local creator = require("creator")

-- AgeableMob only
entity.is_baby = true

-- ArmorStand only
local stands = {}
for _, e in ipairs(world.getEntities()) do
    if e.identifier == "minecraft:armor_stand" then
        table.insert(stands, e)
    end
end

if #stands > 0 then
    local stand = stands[1]
    stand.invisible = true
    stand.small = true
    stand.show_arms = true
    stand.no_base_plate = true

    -- Raise the right arm via table
    stand.right_arm_pose = { x = -90, y = 0, z = 0 }

    -- Or via vector3d
    stand.head_pose = creator.createVector3(0, 25, 0)

    -- Read current pose
    print(stand.right_arm_pose.x)
end
```

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

