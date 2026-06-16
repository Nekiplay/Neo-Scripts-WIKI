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

**age** (_number_) (only for crops)

**delay** (_number_) (only for redstone repeater)

**locked** (_boolean_) (only for redstone repeater)

**layers** (_number_) (only for snow layers)

**extended** (_boolean_) (only for piston)

**facing** ([Direction](direction.md)) (only for directional blocks)

**face** (_string_) (only for attached blocks: "floor", "wall", "ceiling")

**lit** (_boolean_) (only for redstone torch)

**mode** (_string_) (only for comparator: "compare" or "subtract")

**is\_still** (_boolean_) (only for water or waterlogged blocks)

**power** (_number_) (only for redstone wire)

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
