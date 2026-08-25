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

**passengers** (_table list of [Entities](entity.md)_) - riding entities (writable, see below)

### LivingEntity only

**is\_blocking** (_boolean_) - entity blocking with shield

**health** (_number_)

**max\_health** (_number_)

**is\_alive** (_boolean_)

**main\_hand** ([_ItemData_](item.md))

**off\_hand** ([_ItemData_](item.md))

**head** ([_ItemData_](item.md))

**chest** ([_ItemData_](item.md))

**legs** ([_ItemData_](item.md))

**feet** ([_ItemData_](item.md))

**active\_effects** (_table list_) - active potion effects with fields: type, duration, amplifier

### AgeableMob only

**is\_child** / **is\_baby** (_boolean_)

### Player only

**skin** (_string_) - player skin texture

**gamemode** (_string_) - player gamemode (`survival`, `creative`, ...)

**inventory** ([Inventory](inventory.md)) - player inventory

### ItemFrame and ItemEntity only

**item** ([_ItemData_](item.md)) - contained item stack

**is\_invisible** / **invisible** (_boolean_) - whether the entity is invisible

**nbt** (_string_) - entity NBT data

### ArmorStand only
**small** (_boolean_)

**marker** (_boolean_) - marker armor stand (no hitbox, no interaction)

**show\_arms** (_boolean_)

**no\_base\_plate** / **no\_baseplate** (_boolean_)

**head\_pose**, **body\_pose**, **left\_arm\_pose**, **right\_arm\_pose**, **left\_leg\_pose**, **right\_leg\_pose** (_table_) - pose rotations as `{x = number, y = number, z = number}` in degrees

### TextDisplay only

**text** (_string_) - formatted display text

**line\_width** (_number_) - maximum line width in pixels

**text\_opacity** (_number_) - text opacity, `0`-`255`

**background\_color** (_number_) - ARGB background color

**text\_shadow** / **has\_text\_shadow** (_boolean_) - whether the text has a shadow

**see\_through** (_boolean_) - whether the text is visible through blocks

**use\_default\_background** / **default\_background** (_boolean_) - whether the default text background color is used instead of `background_color`

**text\_align** / **text\_alignment** (_string_) - text alignment: `left`, `center` or `right`

### ItemDisplay only

**display\_item** / **displayed\_item** ([Item](item.md)) - displayed item stack or `nil`

### BlockDisplay only

**display\_block** / **displayed\_block** ([Block](block.md)) - displayed block state

### Interaction only

**interaction\_width** (_number_) - interaction hitbox width

**interaction\_height** (_number_) - interaction hitbox height

**response** (_boolean_) - whether the entity signals a successful interaction

### Display only (text/item/block display)

**billboard** / **billboard\_mode** (_string_) - billboard mode:

* `fixed` - the model does not rotate, always oriented as placed (default)
* `vertical` - rotates around the vertical axis to follow the player horizontally
* `horizontal` - tilts up/down to follow the player vertically
* `center` - fully follows the player's view both horizontally and vertically

**view\_range** (_number_) - visibility distance multiplier

**shadow\_radius** (_number_)

**shadow\_strength** (_number_, `0`-`1`)

**brightness\_override** (_number_) - packed light value overriding client-side lighting, `-1` if not overridden

## Functions

### `entity.add_effect(id[, duration][, amplifier])`

Adds a potion effect to the entity (LivingEntity only).

**Parameters:**
* `id` (_string_) - effect identifier (e.g. `"minecraft:speed"`, namespace can be omitted: `"speed"`)
* `duration` (_number_, optional) - duration in ticks, `-1` for infinite (default `-1`)
* `amplifier` (_number_, optional) - amplifier level (default `0`)

**Returns:**
* (_boolean_) - `true` if the effect was applied

### `entity.remove_effect([id])`

Removes potion effects from the entity (LivingEntity only).

**Parameters:**
* `id` (_string_, optional) - effect identifier to remove; if omitted, all effects are removed

**Returns:**
* (_boolean_)

### `entity.add_passenger(entity)`

Makes the given entity ride on this entity. The passenger automatically dismounts from its current vehicle first.

**Parameters:**
* `entity` ([Entity](entity.md))

**Returns:**
* (_boolean_) - `true` if the passenger started riding

### `entity.remove_passenger(entity)`

Dismounts the given passenger from this entity.

**Parameters:**
* `entity` ([Entity](entity.md)) - must currently be a passenger of this entity

**Returns:**
* (_boolean_) - `false` if the entity is not a passenger

### `entity.teleport(x, y, z, onGround)`

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
player.entity.teleport(0, 100, 0, true)
```

**Effects Example Usage:**
```lua
local player = require("player")

-- Infinite Speed II
player.entity.add_effect("minecraft:speed", -1, 1)

-- Jump Boost for 30 seconds (600 ticks)
player.entity.add_effect("jump_boost", 600)

-- Remove speed only
player.entity.remove_effect("minecraft:speed")

-- Remove all effects
player.entity.remove_effect()

-- Inventory access
local inv = player.entity.inventory
if inv then
    inv.add_item(require("items").getFromIdentifier("minecraft:diamond"), 64)
end
```

**Passengers Example Usage:**
```lua
local world = require("world")
local creator = require("creator")

local horse = world.getEntityById(123)
local pig = creator.createEntity("minecraft:pig")
local cow = creator.createEntity("minecraft:cow")
local pigEntity = world.spawnEntity(pig, 100, 70, 100)
local cowEntity = world.spawnEntity(cow, 101, 70, 100)

if horse and pigEntity and cowEntity then
    -- Add one by one
    horse.add_passenger(pigEntity)

    -- Or replace all passengers at once
    horse.passengers = { cowEntity }

    -- Dismount a single passenger
    horse.remove_passenger(cowEntity)
    print(#horse.passengers) -- remaining passenger count
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

### Passengers

* **passengers** (_table list of [Entities](entity.md)_) - replaces all passengers: current ones are ejected, then each entity from the table starts riding in order

### ArmorStand only

* **invisible** / **is\_invisible** (_boolean_) - makes the armor stand invisible
* **small** (_boolean_) - small model
* **marker** (_boolean_) - marker (no hitbox)
* **show\_arms** (_boolean_)
* **no\_base\_plate** / **no\_baseplate** (_boolean_)
* **head\_pose**, **body\_pose**, **left\_arm\_pose**, **right\_arm\_pose**, **left\_leg\_pose**, **right\_leg\_pose** (_table_ or [vector3](../datatypes/vector3.md)) - pose rotations in degrees, e.g. `{x = 0, y = 45, z = 0}`

### TextDisplay only

* **text** (_string_ or [Component](../datatypes/component.md)) - display text
* **line\_width** (_number_)
* **text\_opacity** (_number_, `0`-`255`)
* **background\_color** (_number_) - ARGB color
* **text\_shadow** / **has\_text\_shadow** (_boolean_) - text drop shadow
* **see\_through** (_boolean_) - makes the text visible through blocks
* **use\_default\_background** / **default\_background** (_boolean_)
* **text\_align** / **text\_alignment** (_string_) - `left`, `center` or `right`

### ItemDisplay only

* **display\_item** / **displayed\_item** ([Item](item.md) or `nil`) - displayed item

### BlockDisplay only

* **display\_block** / **displayed\_block** ([Block](block.md)) - displayed block state

### Interaction only

* **interaction\_width** (_number_, min `0`)
* **interaction\_height** (_number_, min `0`)
* **response** (_boolean_)

### Display only (text/item/block display)

* **billboard** / **billboard\_mode** (_string_):
    * `fixed` - no rotation, keeps its original orientation (default)
    * `vertical` - turns left/right to face the player
    * `horizontal` - tilts up/down to face the player
    * `center` - always fully faces the player's view
* **view\_range** (_number_, min `0`) - visibility distance multiplier
* **shadow\_radius** (_number_, min `0`)
* **shadow\_strength** (_number_, `0`-`1`)
* **brightness\_override** (_number_) - packed light value, `-1` disables the override
* **transformation** / **transform** ([Transform](../datatypes/transform.md)) - translation, scale and rotation of the displayed content

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

```lua
local world = require("world")

for _, entity in ipairs(world.getEntities()) do
    -- Text display: set text with color and semi-transparent background
    if entity.identifier == "minecraft:text_display" then
        entity.text = "§aHello §lWorld"
        entity.line_width = 200
        entity.text_opacity = 128
        entity.background_color = 0x80000000
        entity.see_through = true      -- visible through blocks
        entity.text_shadow = true
        entity.text_align = "center"
        print(entity.text)

    -- Item display: show a diamond
    elseif entity.identifier == "minecraft:item_display" then
        local items = require("items")
        entity.display_item = items.getFromIdentifier("minecraft:diamond")
        print(entity.display_item.display_name)

    -- Interaction: configure hitbox and response
    elseif entity.identifier == "minecraft:interaction" then
        entity.interaction_width = 1.5
        entity.interaction_height = 2.0
        entity.response = true
        print(entity.interaction_width, entity.interaction_height, entity.response)
    end
end
```

```lua
local world = require("world")
local creator = require("creator")

for _, entity in ipairs(world.getEntities()) do
    if entity.identifier == "minecraft:block_display" then
        local blocks = require("blocks")
        entity.display_block = blocks.getFromIdentifier("minecraft:gold_block")

        -- Rotate the displayed block and make it always face the player's view
        local transform = creator.createTransform(0, 0, 0, 1, 1, 1, 0, 45, 0)
        entity.transformation = transform
        entity.billboard = "center"
    end
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

