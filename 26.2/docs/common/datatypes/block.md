---
description: Returned information about the blocks
icon: cube
---

# Block

## Variables

**id** (_number_)

**name** (_string_)

**identifier** (_string_) (example: minecraft:coal_ore)

**translation_id** (_string_) (example: block.minecraft.coal_ore)

**type** (_string_) - raw block state string

**hardness** (_number_)

**blast\_resistance** (_number_)

**is\_solid** (_boolean_)

**is\_liquid** (_boolean_)

**is\_air** (_boolean_)

### Crops only (wheat, carrots, ...)

**age** (_number_) - crop growth stage

### Repeater only

**delay** (_number_) - repeater delay (`1`-`4` ticks)

**locked** (_boolean_) - whether the repeater is locked

### Snow Layer only

**layers** (_number_) - number of snow layers

### Piston only

**extended** (_boolean_) - whether the piston is extended

### Directional blocks only (doors, pistons, ...)

**facing** ([Direction](direction.md)) - facing direction

### Attached blocks only (levers, torches, ...)

**face** (_string_) - attach face: `floor`, `wall` or `ceiling`

### Redstone Torch only

**lit** (_boolean_) - whether the torch is lit

### Comparator only

**mode** (_string_) - comparator mode: `compare` or `subtract`

### Redstone Wire only

**power** (_number_) - redstone power level (`0`-`15`)

### Water and waterlogged blocks only

**is\_still** (_boolean_) - whether the fluid state is a source (still) block

### Any block

**properties** ([Block Properties](block_properties.md))

## Settable Properties

Some block state properties can be modified for fake blocks:

```lua
local world = require("world")
local block = world.getBlock(0, 64, 0)
if block then
    block.extended = true    -- for pistons
    block.layers = 3         -- for snow layers
    block.lit = true         -- for redstone torch
    block.power = 15         -- for redstone wire
    block.locked = true      -- for repeaters
    block.delay = 3          -- for repeaters
    block.age = 7            -- for crops
    block.facing = "north"   -- for directional blocks
    block.face = "wall"      -- for attached blocks
end
```
