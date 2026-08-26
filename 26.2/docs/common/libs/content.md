---
description: Dynamic registration of items and blocks from Lua (before registry freeze) — models, collision, variant blocks.
icon: cube
---

# Content

Dynamic content registration library. Available via `require("content")` on both client and server. Lets you create items and blocks from Lua like a Fabric mod, without JSON/datapacks.

::: warning Requires autostart
All `register*` functions must be called **before registries freeze** — i.e. from scripts in `neoscripts/autostart/*.lua`. That folder is executed from `ServerMain.onInitialize` on both sides (before the first resource load). Calls from `/lua` or `WindowMixin` autoload (`config/neoscripts/scripts/autoload.lua`) work via freeze-fallback but textures may require `F3+T`.
:::

The library creates a runtime resource pack (`neoscripts_dynamic_content`, `required`+`fixed`, `BOTTOM` priority) with generated assets so other packs/mods can override the models.

## `createSettings([table])`

Create a `content_settings` object (see [LuaContentSettings](#luacontentsettings)). All fields are optional. Also aliased as `contentSettings` / `itemSettings` / `blockSettings`.

**Parameters:**

* `table` (table, optional) — initial values `{ name, texture, model, maxStackSize, fireResistant, rarity, durability, craftRemainder, enchantable, useCooldown, hardness, resistance, luminance, friction, sound, mapColor, instabreak, requiresTool, offsetType, copyFrom, noCollision, noOcclusion, shape }`

**Returns:**

* (`content_settings`) mutable settings object. Fields can be read/written afterwards (`settings.name = "..."`).

**Example:**

```lua
local content = require("content")
local settings = content.createSettings({
    name = "My Item",
    texture = "neoscripts/autostart/golden_carrot.png",
    model = "minecraft:item/generated", -- or file path or short id
    maxStackSize = 16,
    rarity = "epic"
})
-- alternative: builder component as name
local ComponentBuilder = require("text-builder")
settings.name = ComponentBuilder.new("Pizza"):build() -- -> readable string "Pizza"
settings.fireResistant = true
```

## `registerItem(id [, settings])`

Register a new item via Fabric pattern `ResourceKey<Item>` + `Item.Properties.setId(key)` + `Registry.register`.

**Parameters:**

* `id` (string) — identifier, e.g. `"neoscripts:test"` (without namespace defaults to `minecraft:`).
* `settings` (content_settings | table, optional) — result of `createSettings` or plain table.

**Returns:**

* (string) — registered identifier string (`"neoscripts:test"`) on success, `nil` on failure. **Not** an `ItemStack` — `ItemStack` cannot be created in `onInitialize` (`Holder.components` not bound yet). After game load use `require("items").getFromIdentifier(id)`.

**Example:**

```lua
local content = require("content")
local ComponentBuilder = require("text-builder")

local builder = ComponentBuilder.new("Pizza")
local settings = content.createSettings()
settings.name = builder:build()
settings.texture = "neoscripts\\autostart\\golden_carrot.png"
settings.maxStackSize = 16

local id = content.registerItem("neoscripts:test", settings)
print(id) -- "neoscripts:test"
-- after load: /give @s neoscripts:test
```

Texture file is read immediately into memory (`DynamicContent.textureData`) and served by the runtime pack as:
- `assets/<ns>/items/<path>.json` → `{"model":{"type":"minecraft:model","model":"<ns>:item/<path>"}}` or direct `model` if it points to a block (e.g. `minecraft:block/diamond_block`)
- `assets/<ns>/models/item/<path>.json` → `{"parent":"<model>","textures":{"layer0":"<ns>:item/<path>"}}` or custom JSON file bytes
- `assets/<ns>/textures/item/<path>.png` → PNG bytes

## `registerBlock(id [, settings])`

Register a new cube block (`Block(Properties.of().setId(key))`). For custom name overrides `Block#getName()`. See [first-block](https://docs.fabricmc.net/develop/blocks/first-block).

**Parameters:**

* `id` (string)
* `settings` (content_settings | table, optional) — `hardness`, `resistance`, `luminance` (0..15), `friction`, `sound`, `mapColor`, `instabreak`, `requiresTool`, `offsetType`, `copyFrom`, `noCollision`, `noOcclusion`, `shape` are block-specific.

**Returns:**

* ([Block](../datatypes/block.md)) default `BlockState` wrapper (`LuaBlockState`) on success.

**Examples:**

```lua
local content = require("content")
-- basic cube copying stone properties
local state = content.registerBlock("neoscripts:ruby_block", { hardness = 3, resistance = 6, luminance = 5 })
print(state.name)

-- full copy of vanilla block + custom sound
local s2 = content.createSettings({ copyFrom="minecraft:stone", sound="stone", requiresTool=true })
content.registerBlock("neoscripts:condensed_dirt", s2)

-- grass-like no collision, offset
content.registerBlock("neoscripts:waxcap", { noCollision=true, instabreak=true, offsetType="xyz", sound="grass" })

-- custom model via Identifier (any namespace)
content.registerBlock("neoscripts:cross_block", { model="minecraft:block/cross", texture="config/neoscripts/textures/cross.png" })
-- short id expands to minecraft:block/diamond_block
content.registerBlock("neoscripts:mimic", { model="minecraft:diamond_block" })
-- tinker-style
content.registerBlock("neoscripts:tink_cast", { model="tinker_construct:block/cast_iron" })
-- custom JSON file
content.registerBlock("neoscripts:custom_model", { model="config/neoscripts/models/custom.json" })
```

## `registerSlab(id [, settings])`

Register a `SlabBlock`. Generates `blockstates/type=bottom|top|double`, models `block/<path>` (`minecraft:block/slab`) and `block/<path>_top`.

**Example:**

```lua
local s = content.createSettings({ hardness=2, sound="stone" })
local slab = content.registerSlab("neoscripts:ruby_slab", s)
content.registerBlockItem("neoscripts:ruby_slab", slab)
```

## `registerStairs(id, baseIdOrState [, settings])`

Register a `StairBlock(baseState, props)`. Base can be string id (`"minecraft:stone"` / `"neoscripts:ruby_block"`) or `LuaBlockState` returned by `registerBlock`. Copies properties from base via `ofFullCopy`. Generates stairs/inner/outer models and 40 variants.

**Example:**

```lua
local base = content.registerBlock("neoscripts:ruby_block", { hardness=3 })
local stairs = content.registerStairs("neoscripts:ruby_stairs", base, { sound="stone" })
-- or by id:
local stairs2 = content.registerStairs("neoscripts:ruby_stairs2", "neoscripts:ruby_block")
content.registerBlockItem("neoscripts:ruby_stairs", stairs)
```

## `registerDoor(id [, settings [, blockSetType]])`

Register a `DoorBlock(BlockSetType, props)`. `blockSetType`: `oak, spruce, birch, jungle, acacia, dark_oak, iron, stone, copper` (default `stone`). Generates door bottom/top models.

```lua
content.registerDoor("neoscripts:ruby_door", { hardness=3 }, "oak")
-- or
content.registerDoor("neoscripts:iron_door", { copyFrom="minecraft:iron_door" }, "iron")
```

## `registerTrapdoor(id [, settings [, blockSetType]])`

Register a `TrapDoorBlock`.

```lua
content.registerTrapdoor("neoscripts:ruby_trapdoor", { sound="wood" }, "oak")
```

## `registerFence(id [, settings])`

Register a `FenceBlock` (multipart).

```lua
content.registerFence("neoscripts:ruby_fence", { hardness=2 })
```

## `registerBlockItem(id, blockState [, settings])`

Register a `BlockItem` for a previously registered block.

**Parameters:**

* `id` (string) — item id (usually same as block id).
* `blockState` ([Block](../datatypes/block.md) | `BlockState`) — result of `registerBlock/Slab/...`.
* `settings` (content_settings | table, optional) — item properties (name, texture, stack size, etc.). Argument order is flexible: `(id, state, settings)` or `(id, settings, state)`.

**Returns:**

* (string) — item identifier string, `nil` on failure.

**Example:**

```lua
local content = require("content")
local blockState = content.registerBlock("neoscripts:ruby_block")
local itemId = content.registerBlockItem("neoscripts:ruby_block", blockState, { name = "Ruby Block" })
-- slabs/stairs etc:
local slabState = content.registerSlab("neoscripts:ruby_slab")
content.registerBlockItem("neoscripts:ruby_slab", slabState)
```

For `BlockItem` whose id equals block id, the generated item model is `{"parent":"<ns>:block/<path>"}` (item looks like block). For standalone items see `registerItem`.

## `registerFood(id [, settings [, foodTable]])`

Register a food item (`Item.Properties.food(FoodProperties)`).

**Parameters:**

* `id` (string) — e.g. `"neoscripts:apple_pie"`
* `settings` (content_settings | table, optional)
* `foodTable` (table, optional) — `{ nutrition=4, saturation=0.6, alwaysEdible=false }`. Defaults to `4 / 0.6 / false` if omitted.

**Returns:**

* (string) identifier, `nil` on failure.

**Example:**

```lua
local content = require("content")
content.registerFood("neoscripts:pizza", { name="Pizza", texture="neoscripts/autostart/pizza.png" }, { nutrition=8, saturation=0.8 })
content.registerFood("neoscripts:snack", { nutrition=2, saturation=0.3, alwaysEdible=true })
```

## `registerDrink(id [, settings [, foodTable]])`

Register a drink (`FoodProperties` + `Consumables.DEFAULT_DRINK`, drink animation). Same `foodTable` format. If `foodTable` omitted defaults to `0 / 0`.

**Example:**

```lua
local content = require("content")
content.registerDrink("neoscripts:cola", { name="Cola", texture="neoscripts/autostart/cola.png" }, { nutrition=0, saturation=0.2 })
```

## `registerTool(id [, settings [, toolTable]])`

Register a tool (`pickaxe`, `axe`, `shovel`, `hoe`, `sword`, `paxel`).

**Parameters:**

* `id` (string)
* `settings` (content_settings | table, optional)
* `toolTable` (table, optional) — `{ type="pickaxe", material="diamond", damage=1, speed=-2.8 }`. `material`: `wood`/`stone`/`copper`/`iron`/`diamond`/`gold`/`netherite` (default `iron`). `paxel` combines pickaxe+axe+shovel+hoe.

**Example:**

```lua
local content = require("content")
content.registerTool("neoscripts:ruby_pickaxe", { name="Ruby Pickaxe", texture="neoscripts/autostart/ruby_pickaxe.png" }, { type="pickaxe", material="diamond", damage=1, speed=-2.8 })
content.registerTool("neoscripts:paxel", { name="Paxel" }, { type="paxel", material="netherite", damage=5, speed=12 })
```

## `getItemTexture(id)`

Get the asset texture identifier string for a dynamic item as served by the runtime pack.

**Parameters:**

* `id` (string) — e.g. `"neoscripts:test"`

**Returns:**

* (string | nil) — `"neoscripts:textures/item/test.png"`-style identifier if texture was stored, `nil` otherwise.

**Example:**

```lua
local content = require("content")
local tex = content.getItemTexture("neoscripts:test")
if tex then print(tex) end
```

## Model system

`settings.model` accepts:

* vanilla/any mod Identifier `minecraft:block/cube_all`, `minecraft:block/cross`, `minecraft:item/handheld`, `minecraft:block/diamond_block`, `tinker_construct:block/cast_iron`
* short id `minecraft:diamond_block` → expands to `minecraft:block/diamond_block` for blocks, `minecraft:item/...` for items
* file path `config/neoscripts/models/my_model.json` or absolute path — bytes are read and served directly as `models/block/<path>.json` or `models/item/<path>.json`

Runtime pack generates:
- `assets/<ns>/items/<path>.json` — item definition (26.x)
- `assets/<ns>/models/item/<path>.json` — item model (or block copy)
- `assets/<ns>/blockstates/<path>.json` — e.g. `{"variants":{"":{"model":"<ns>:block/<path>"}}}` or slab/stairs/door variants
- `assets/<ns>/models/block/<path>.json` — block model (cube_all, slab, stairs, door_bottom/top, trapdoor, fence_post/side)
- `assets/<ns>/textures/item/<path>.png` and `assets/<ns>/textures/block/<path>.png`

## Collision & shape

By default block is full cube `16×16×16`. Controls:

* `noCollision = true` / `collision = false` / `collidable = false` → `Properties.noCollision()` (walk-through, like grass)
* `noOcclusion = true` / `transparent = true` → `noOcclusion()` (does not block light, like glass)
* custom shape via `shape` / `collisionShape` / `boxes` / `hitbox` — list of boxes in `0..32` units (16 = 1 block). Supports height `>16` for 2-block tall colliders.

**Shape formats (all equivalent):**

```lua
-- 1) from/to vectors (0..32, 32 = 2 blocks high)
content.registerBlock("test:tall", content.createSettings({
    shape = { from={0,0,0}, to={16,32,16} } -- 2 блока высоты
}))

-- 2) flat 6 numbers per box
content.registerBlock("test:thin", { shape = {0,0,0, 16,8,16} })

-- 3) multiple boxes (L-shape)
content.registerBlock("test:lshape", { shape = {
    {from={0,0,0}, to={16,8,16}},
    {from={0,8,0}, to={8,16,16}}
}})

-- 4) mixed via boxes alias
content.registerBlock("test:complex", { boxes = {
    {0,0,0, 16,16,16},
    {0,16,0, 16,32,16}
}})
```

Internally boxes are merged with `Block.box` (0..16) or `Shapes.box` (normalized 0..1) for >16, combined via `Shapes.or`. The resulting `VoxelShape` overrides `getShape`, `getCollisionShape`, `getOcclusionShape`, `getVisualShape`, `getBlockSupportShape`.

**Examples:**

```lua
-- walk-through, no hitbox
content.registerBlock("test:ghost", { noCollision=true, transparent=true, sound="glass" })

-- 2 blocks tall wall (collision 2×height, model still cube — extend model file to "minecraft:block/cube" or custom tall model)
content.registerBlock("test:tall_wall", {
    texture="config/neoscripts/textures/wall.png",
    model="minecraft:block/cube_all",
    shape={ {from={0,0,0}, to={16,32,16}} },
    hardness=2, sound="stone", requiresTool=true
})

-- slab + custom hitbox (example fence-like thin)
content.registerBlock("test:custom_slab", { shape={0,0,0, 16,8,16} })
```

## LuaContentSettings

Mutable userdata `content_settings` (`typename() == "content_settings"`). Fields via `get`/`set`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | string\|Component | `nil` | Display name. Accepts plain string or `text-builder` component (`toComponent().string`). Overrides `Item#getName` / `Block#getName`. |
| `texture` | string | `nil` | File path to PNG on disk, e.g. `"neoscripts/autostart/icon.png"`. Read at registration. Relative to game dir if not absolute. |
| `model` / `parent` / `modelFile` | string | `nil` | Parent model Identifier or file path to JSON. See [Model system](#model-system). Short `minecraft:diamond_block` expands. |
| `maxStackSize` | integer | `64` | `Item.Properties.stacksTo` (1..99). |
| `fireResistant` / `fire_resistant` | boolean | `false` | `fireResistant()`. |
| `rarity` | string | `nil` | `"common"`, `"uncommon"`, `"rare"`, `"epic"` → `Rarity`. |
| `durability` | integer | `nil` | `durability(int)`. |
| `craftRemainder` / `craft_remainder` | string | `nil` | Identifier of remainder item (e.g. `"minecraft:bucket"`). |
| `enchantable` | integer | `nil` | `enchantable(int)`. |
| `useCooldown` / `use_cooldown` | number | `nil` | `useCooldown(float)` seconds. |
| `hardness` / `destroyTime` / `strength` | number | `nil` | Block `strength(hardness, resistance)` — hardness part. |
| `resistance` / `explosionResistance` | number | `nil` | Block explosion resistance. |
| `luminance` / `lightLevel` | integer | `nil` | `lightLevel` 0..15. |
| `friction` | number | `nil` | `friction(float)`. |
| `sound` / `soundType` | string | `nil` | `SoundType`: `stone, wood, grass, metal, glass, wool, sand, snow, powder_snow, ladder, anvil, slime, honey, wet_grass, coral, bamboo, soul_sand, soul_soil, basalt, wart, nether_wood, stem, nylium, fungus, roots, chain, copper, amethyst, tuff, calcite, dripstone, sculk, bone, lantern` etc. Aliases `dirt→GRASS`, `slime→SLIME_BLOCK`. |
| `mapColor` / `color` | string | `nil` | `MapColor`: `stone, dirt, wood, metal, plant, sand, wool, fire, snow, clay, grass, water, lava, ...` (field `COLOR_<name>`). |
| `instabreak` / `insta_break` | boolean | `false` | `instabreak()`. |
| `requiresTool` / `requiresCorrectTool` | boolean | `false` | `requiresCorrectToolForDrops()`. |
| `offsetType` / `offset` | string | `nil` | `"none"`, `"xz"`, `"xyz"` → `OffsetType`. |
| `copyFrom` / `fullCopy` | string | `nil` | Block id to `ofFullCopy`, e.g. `"minecraft:stone"`. |
| `ignitedByLava` | boolean | `nil` | `ignitedByLava()` if `true`. |
| `noCollision` / `no_collision` / `collision=false` | boolean | `false` | `noCollision()`. |
| `noOcclusion` / `transparent` | boolean | `false` | `noOcclusion()`. |
| `shape` / `collisionShape` / `boxes` / `hitbox` | table | `nil` | Custom VoxelShape: list of boxes `{from={x,y,z},to={x2,y2,z2}}` or flat `{x1,y1,z1,x2,y2,z2}`. Units `0..32` (16 = 1 block). Example `{{from={0,0,0},to={16,32,16}}}` for 2 blocks high. |

All keys accept both `camelCase` and `snake_case` (`maxStackSize` / `max_stack_size`, `noCollision` / `no_collision`).

## Notes on Fabric `first-block` parity

`BlockBehaviour.Properties` parity with `Blocks` / `ModBlocks` example:

```java
// condensed_dirt
BlockBehaviour.Properties.of().sound(SoundType.GRASS)
// waxcap — noCollision + instabreak + offset
BlockBehaviour.Properties.of().noCollision().instabreak().offsetType(XYZ)
// prismarine lamp
BlockBehaviour.Properties.of().sound(SoundType.LANTERN).lightLevel(state -> 15)
// ruby family
BlockBehaviour.Properties.of() — slab/stairs/fence/door all delegate to same settings table
```

In Lua the equivalent is one `createSettings` table reused:

```lua
local base = content.createSettings({ hardness=3, sound="stone", mapColor="metal" })
content.registerBlock("test:ruby_block", base)
content.registerSlab("test:ruby_slab", base)
content.registerStairs("test:ruby_stairs", "test:ruby_block", base)
content.registerDoor("test:ruby_door", base, "oak")
content.registerFence("test:ruby_fence", base)
```
