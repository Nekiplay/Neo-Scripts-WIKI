---
description: Display entity transformation
icon: rotate
---

# Transform

Transformation for display entities (`text_display`, `item_display`, `block_display`): translation, scale and rotation.

Created via [creator.createTransform](../libs/creator.md#createtransformtx-ty-tz-sx-sy-sz-rx-ry-rz).

## Variables

All fields are writable and accept a table `{x = number, y = number, z = number}`:

**translation** / **offset** (_table_) - offset in blocks relative to the entity position

**scale** (_table_) - scale multiplier per axis

**rotation** / **rotation\_degrees** (_table_) - rotation in degrees per axis

## Applying

Assign the transform to a [display entity](entity.md) via the `transformation` / `transform` property:

```lua
local creator = require("creator")
local world = require("world")

for _, entity in ipairs(world.getEntities()) do
    if entity.identifier == "minecraft:item_display" then
        local transform = creator.createTransform(0, 0.5, 0) -- lift by half a block
        transform.scale = { x = 2, y = 2, z = 2 }
        transform.rotation = { x = 0, y = 45, z = 0 }
        entity.transformation = transform
    end
end
```
