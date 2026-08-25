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

**matrix** (_table_, read-only) - full 4x4 transformation matrix in row-major order (16 numbers). Available when the transform was read from a display entity (`entity.transformation`); it is `nil` for transforms created via `creator.createTransform`.

> [!NOTE]
> Rotation uses XYZ euler order (`Rx * Ry * Rz`), consistent between `creator.createTransform` and values read back from entities. For arbitrary rotations that don't fit euler decomposition (e.g. composed model transforms), prefer assigning a raw matrix - see below.

## Raw matrix assignment

`entity.transformation` also accepts a table with a `matrix` field - a row-major 4x4 matrix (16 numbers). This applies the transformation exactly, without any euler conversion:

```lua
-- 4x4 identity-based example: rotate 90° around Y and offset by X
-- | 0 0 -1 1 |
-- | 0 1  0 0 |
-- | 1 0  0 0 |
-- | 0 0  0 1 |
entity.transformation = {
    matrix = {
        0, 0, -1, 1,
        0, 1,  0, 0,
        1, 0,  0, 0,
        0, 0,  0, 1
    }
}
```

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
