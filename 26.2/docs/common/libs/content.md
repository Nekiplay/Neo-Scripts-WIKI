---
description: Dynamic registration of items and blocks from Lua (before registry freeze) — models, collision, variant blocks.
icon: cube
---

# Content

Dynamic content registration library. Available via `require("content")` on both client and server. Lets you create items and blocks from Lua like a Fabric mod, without JSON/datapacks.

::: warning Requires autostart
All `register*` functions must be called **before registries freeze** — i.e. from scripts in `neoscripts/autostart/*.lua`. That folder is executed from `ServerMain.onInitialize` on both sides (before the first resource load).
:::

The library creates a runtime resource pack (`neoscripts_dynamic_content`, `required`+`fixed`, `BOTTOM` priority) with generated assets so other packs/mods can override the models.

## `createSettings([table])`

Create a `content_settings` object (see [LuaContentSettings](#luacontentsettings)). All fields are optional. Also aliased as `contentSettings` / `itemSettings` / `blockSettings`.

**Parameters:**

* `table` (table, optional) — initial values `{ name, texture, model, maxStackSize, fireResistant, rarity, durability, craftRemainder, enchantable, useCooldown, hardness, resistance, luminance, friction, sound, mapColor, instabreak, requiresTool, offsetType, copyFrom, noCollision, noOcclusion, shape, drops, ore, tags, blockTags, mineableTool, tier, textures }`

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

## Drops & loot tables

Block loot is generated as data pack JSON via the runtime pack (see [Fabric first-block — Adding Block Drops](https://docs.fabricmc.net/develop/blocks/first-block#adding-block-drops) and [minecraft.wiki/w/Loot_table](https://minecraft.wiki/w/Loot_table)). No `condition` is added by default (always drops). For each registered block (`registerBlock/Slab/Stairs/Door/Trapdoor/Fence`) `DynamicContent.blockDrops` is filled and served as both `data/<ns>/loot_table/blocks/<path>.json` (26.2, singular) and legacy `data/<ns>/loot_tables/blocks/<path>.json`.

**`settings.drops` values:**

* `nil` (default) — drops itself (`[{id="<block_id>"}]`) — mirrors Fabric example that drops the block item.
* `false` / `{}` / `"none"` / `"empty"` — nothing (`pools: []`).
* `"minecraft:diamond"` — single item.
* `{"minecraft:diamond","minecraft:stick"}` — each item its own `pool {rolls:1, entries:[{name}]}` → all drop together.
* `{{id="minecraft:diamond", count=3}, {id="minecraft:emerald", min=1, max=3}}` — fixed `count` or uniform range via `minecraft:set_count` (`min`/`max` → `{"min":..,"max":..,"type":"minecraft:uniform"}`).
* `{{id="minecraft:diamond", weight=10}, {id="minecraft:emerald", weight=1}}` — weighted random choice: when any `weight` is present all entries share one pool `{rolls:1, entries:[{name,weight},...]}` (see `Loot_table#weight`). `count`/`weight`/`conditions` can be combined.
* `{{id="minecraft:diamond", conditions={{condition="minecraft:random_chance", chance=0.1}}}}` or `condition={condition="minecraft:survives_explosion"}` — per-entry `conditions` (see [minecraft.wiki/w/Predicate](https://minecraft.wiki/w/Predicate)). Accepts `conditions`/`condition`/`predicates`/`predicate`/`when` as single object or array. Lua tables are converted to JSON via `luaValueToJson` (nested tables → objects, `1..n` → arrays).

**Generated JSON examples:**

```json
{"type":"minecraft:block","pools":[{"rolls":1,"entries":[{"type":"minecraft:item","name":"neoscripts:ruby_block"}]}]}
{"type":"minecraft:block","pools":[]}
{"type":"minecraft:block","pools":[
  {"rolls":1,"entries":[{"type":"minecraft:item","name":"minecraft:diamond","functions":[{"function":"minecraft:set_count","count":3}]}]},
  {"rolls":1,"entries":[{"type":"minecraft:item","name":"minecraft:emerald","functions":[{"function":"minecraft:set_count","count":{"min":1.0,"max":3.0,"type":"minecraft:uniform"}}]}]}
]}
{"type":"minecraft:block","pools":[{"rolls":1,"entries":[
  {"type":"minecraft:item","name":"minecraft:diamond","weight":10},
  {"type":"minecraft:item","name":"minecraft:emerald","weight":1,"conditions":[{"condition":"minecraft:random_chance","chance":0.5}]}
]}]}
```

**Lua examples:**

```lua
local content = require("content")
-- self drop (default, Fabric example)
content.registerBlock("neoscripts:condensed_dirt", { hardness=2 })

-- nothing
content.registerBlock("neoscripts:ghost_block", { drops=false })

-- multi drop, all
content.registerBlock("neoscripts:treasure", { drops={"minecraft:diamond","minecraft:emerald"} })

-- count / range
content.registerBlock("neoscripts:rich_ore", { drops={
  {id="minecraft:diamond", count=3},
  {id="minecraft:emerald", min=1, max=3}
}})

-- weighted (one of)
content.registerBlock("neoscripts:gamble", { drops={
  {id="minecraft:diamond", weight=10},
  {id="minecraft:stick", weight=1}
}})

-- predicates (chance, tool, explosion)
content.registerBlock("neoscripts:rare", { drops={{
  id="minecraft:diamond",
  conditions={{condition="minecraft:random_chance", chance=0.1}}
}}})
content.registerBlock("neoscripts:silk_only", { drops={{
  id="minecraft:diamond",
  condition={condition="minecraft:survives_explosion"}
}}})
content.registerBlock("neoscripts:tool_gated", { drops={{
  id="minecraft:diamond",
  conditions={condition="minecraft:match_tool", predicate={items="minecraft:iron_pickaxe"}}
}}})

-- runtime change (needs /reload on integrated server to re-read data pack)
content.setDrops("neoscripts:condensed_dirt", "minecraft:gold_ingot")
print(content.getDrops("neoscripts:condensed_dirt")[1].id)
```

## `setDrops(id, drops)` / `getDrops(id)`

Aliases: `setDrop`/`setLoot`/`setBlockDrops`/`setLootTable` and `getDrop`/`getLoot`/`getBlockDrops`/`getLootTable`.

* `setDrops(id, drops)` — change loot of an already registered block at runtime. `drops`: same formats as `settings.drops`; `nil` resets to self-drop, `false`/`{}` clears. Returns `true` if block exists, `false` otherwise. The pack rebuilds `loot_table` on next `listResources`/`getResource`; run `/reload` to apply on integrated server.
* `getDrops(id)` — returns `{{id=..,count=..,min=..,max=..,weight=..,conditions={json,...}}, ...}` or `nil` if block not found. `conditions` are returned as JSON strings (decode via `require("json").decode` if needed).

```lua
local content = require("content")
content.setDrops("neoscripts:ruby_block", {
  {id="minecraft:diamond", weight=3, conditions={{condition="minecraft:random_chance", chance=0.5}}},
  {id="minecraft:emerald", weight=1}
})
local drops = content.getDrops("neoscripts:ruby_block")
for i,d in ipairs(drops) do print(d.id, d.weight, d.conditions and d.conditions[1]) end
```

## Ore generation

Worldgen for custom ores via runtime data pack (see [Fabric: Generating Custom Ores](https://wiki.fabricmc.net/tutorial:ores), 1.19.3+ JSON approach). For each block the pack generates:

* `data/<ns>/worldgen/configured_feature/<path>.json` — `{"type":"minecraft:ore","config":{"discard_chance_on_air_exposure":..,"size":..,"targets":[...]}}`
* `data/<ns>/worldgen/placed_feature/<path>.json` — `{"feature":"<ns>:<path>","placement":[{"type":"minecraft:count","count":..},{"type":"minecraft:in_square"},{"type":"minecraft:height_range","height":{"type":"minecraft:trapezoid|uniform","min_inclusive":{"absolute":..},"max_inclusive":{"absolute":..}}},{"type":"minecraft:biome"}]}`

and calls `BiomeModifications.addFeature(selector, GenerationStep.Feature.UNDERGROUND_ORES, placedKey)` in `onInitialize` (so a new world / new chunks are required to see ores; existing chunks need re-generation).

Enable via `ore` field in `createSettings` / `registerBlock(..., {ore={...}})` (auto `storeOre` for `registerBlock/Slab/Stairs/Door/Trapdoor/Fence`). `content.getWorldGeneration` only reads back the stored config (alias `getOre` kept).

**`ore` table fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `size` / `veinSize` | integer | `9` | Vein size (`config.size`). |
| `count` / `veinsPerChunk` | integer | `10` | Veins per chunk (`placement count`). |
| `minY` / `min_y` / `min` | integer | `-64` | `height min_inclusive absolute`. |
| `maxY` / `max_y` / `max` | integer | `64` | `height max_inclusive absolute`. Clamped `-64..320`, auto-swapped if `min>max`. |
| `height` / `heightType` | string | `"trapezoid"` | `"trapezoid"` or `"uniform"` → `height.type`. |
| `replace` / `target` | string | `nil` → auto by `biomes` | What to replace. Single or comma-separated list. Overworld default = `stone_ore_replaceables + deepslate_ore_replaceables` (two `tag_match` targets). `netherrack` / `end_stone` / `minecraft:stone_ore_replaceables` / `#minecraft:stone_ore_replaceables` / any `ns:block` or tag. |
| `biomes` / `dimension` | string | `"overworld"` | Biome selector: `"overworld"` → `foundInOverworld()`, `"nether"` → `foundInNether()`, `"end"` → `foundInTheEnd()`, `"#ns:tag"` → `BiomeSelectors.tag`. |
| `discardChance` | number | `0.0` | `discard_chance_on_air_exposure` 0..1. |
| `featureId` / `feature` | string | `<blockId>` | Placed+configured feature id. If not namespaced defaults to block id. |

**Examples (only via settings — `content.registerOre` is not exposed, use `ore` in block settings):**

```lua
local content = require("content")

-- overworld ore via settings (tutorial: end_rod in stone/deepslate, 20 veins trapezoid -24..70, size 12)
local oreBlock = content.registerBlock("tutorial:ruby_ore", {
  hardness=3, requiresTool=true,
  ore={ size=12, count=20, minY=-24, maxY=70, height="trapezoid", biomes="overworld" }
  -- replace defaults to stone+deepslate tags
})
content.registerBlockItem("tutorial:ruby_ore", oreBlock)

-- nether ore (like nether gold) uniform height, larger vein
local netherOre = content.registerBlock("tutorial:nether_ruby_ore", {
  hardness=3,
  ore={ size=20, count=20, minY=10, maxY=80, height="uniform", replace="minecraft:netherrack", biomes="nether" }
})
content.registerBlockItem("tutorial:nether_ruby_ore", netherOre)

-- end ore + custom replace list + tag selector
local endOre = content.registerBlock("tutorial:end_ruby_ore", {
  hardness=3,
  ore={ size=9, count=10, minY=0, maxY=80, replace="minecraft:end_stone", biomes="end" }
})
local custom = content.registerBlock("tutorial:custom_vein", {
  ore={ size=8, count=12, minY=0, maxY=40, replace="minecraft:stone_ore_replaceables, minecraft:deepslate_ore_replaceables", biomes="#minecraft:is_overworld" }
})
print(content.getWorldGeneration("tutorial:ruby_ore").count) -- -> 20
```

Generated examples (mirrors wiki):

`data/tutorial/worldgen/configured_feature/ore_custom.json`:
```json
{"type":"minecraft:ore","config":{"discard_chance_on_air_exposure":0.0,"size":12,"targets":[
  {"state":{"Name":"tutorial:ruby_ore"},"target":{"predicate_type":"minecraft:tag_match","tag":"minecraft:stone_ore_replaceables"}},
  {"state":{"Name":"tutorial:ruby_ore"},"target":{"predicate_type":"minecraft:tag_match","tag":"minecraft:deepslate_ore_replaceables"}}
]}}
```
`data/tutorial/worldgen/placed_feature/ore_custom.json`:
```json
{"feature":"tutorial:ruby_ore","placement":[
  {"type":"minecraft:count","count":20},
  {"type":"minecraft:in_square"},
  {"type":"minecraft:height_range","height":{"type":"minecraft:trapezoid","min_inclusive":{"absolute":-24},"max_inclusive":{"absolute":70}}},
  {"type":"minecraft:biome"}
]}
```

Nether variant uses `block_match` + `uniform`:
```json
{"type":"minecraft:ore","config":{"discard_chance_on_air_exposure":0.0,"size":20,"targets":[{"state":{"Name":"tutorial:nether_ruby_ore"},"target":{"predicate_type":"minecraft:block_match","block":"minecraft:netherrack"}}]}}
```

Readback:

```lua
content.getWorldGeneration("tutorial:ruby_ore") -- -> {size=9,count=10,minY=-64,maxY=64,height="trapezoid",biomes="overworld", ...}
```

::: warning Requires autostart + new chunks
Ore JSON and `BiomeModifications` must be registered in `neoscripts/autostart/*.lua` before world creation. After adding, create a new world or explore new chunks; `/reload` does not retro-generate already generated chunks.
:::

## Tags

Item/block tags for recipes and other data pack lookups (see [Fabric: Data Generation — Tag Generation](https://docs.fabricmc.net/develop/data-generation/tags)). The runtime pack generates `data/<tagNs>/tags/item/<path>.json` and `data/<tagNs>/tags/block/<path>.json` with `{"replace":false,"values":["<ns>:<id>", ...]}`.

Set via `settings.tags` (item tags, also fallback for block tags) or `settings.blockTags`. Works for `registerItem/Food/Drink/Tool` → item tags, and `registerBlock/Slab/Stairs/Door/Trapdoor/Fence` → block tags (and item tags for convenience). `registerBlockItem` also respects `tags`.

```lua
local content = require("content")

-- item as tin ingot (so any recipe with #c:tin_ingots accepts it)
content.registerItem("mymod:tin_ingot", {
  tags="c:tin_ingots" -- or {"c:tin_ingots","c:ingots/tin","fabric:tin_ingots"}
})

-- multiple tags at once
content.registerItem("mymod:tin_nugget", {
  tags={"c:tin_nuggets","c:nuggets/tin", tag="c:nuggets"}
})

-- olovo as alias for tin (another mod's tag)
content.registerItem("mymod:olovo_ingot", { tags="c:tin_ingots" })

-- block + its item in tag (so crafting with #c:tin_blocks works)
local tinBlock = content.registerBlock("mymod:tin_block", {
  hardness=3,
  tags="c:tin_blocks", -- -> both item and block tags
  blockTags="c:storage_blocks/tin" -- explicit block tag (overrides fallback if set)
})
content.registerBlockItem("mymod:tin_block", tinBlock, { tags="c:tin_blocks" })

-- shared base via settings
local base = content.createSettings({ tags="c:tin_ingots" })
base.tags = {"c:tin_ingots","c:ingots/tin"}
content.registerItem("mymod:tin_dust", base)
```

Generated:

`data/c/tags/item/tin_ingots.json`:
```json
{"replace":false,"values":["mymod:tin_ingot","mymod:olovo_ingot","mymod:tin_dust"]}
```
`data/c/tags/block/tin_blocks.json`:
```json
{"replace":false,"values":["mymod:tin_block"]}
```

Recipes can then use:

```json
{
  "type":"minecraft:crafting_shaped",
  "pattern":["###","###","###"],
  "key":{"#":{"tag":"c:tin_ingots"}},
  "result":{"id":"mymod:tin_block","count":1}
}
```

Access via code: `settings.tags = {"c:tin_ingots"}` / `settings.blockTags = {"c:ores/tin"}` / `settings:get("tags")` etc.

## Recipes

Crafting/furnace recipes via runtime data pack (see [Fabric: Creating Custom Recipes](https://wiki.fabricmc.net/tutorial:recipes) and [Recipe wiki](https://minecraft.wiki/w/Recipe)). Pack generates `data/<ns>/recipe/<path>.json` (+ legacy `data/<ns>/recipes/<path>.json` for 1.20).

Register via `content.registerRecipe(id, recipeTable)` — `recipeTable` is Lua table converted to JSON via `luaValueToJson` (nested tables → objects, `1..n` → arrays). `id` like `"mymod:tin_block"` determines file path.

**Shaped (1.21+ uses `#tag` strings, 1.21.1 shows object, both work):**

```lua
local content = require("content")
-- tin block from 9 tin ingots (tag #c:tin_ingots, so olovo also works)
content.registerRecipe("mymod:tin_block", {
  type="minecraft:crafting_shaped",
  category="building",
  pattern={"###","###","###"},
  key={ ["#"]={tag="c:tin_ingots"} }, -- or {tag="c:tin_ingots"} == "#c:tin_ingots" string also valid
  result={id="mymod:tin_block", count=1}
})
-- reverse: 9 ingots from block (shapeless)
content.registerRecipe("mymod:tin_ingot_from_block", {
  type="minecraft:crafting_shapeless",
  category="misc",
  ingredients={{tag="c:tin_blocks"}},
  result={id="mymod:tin_ingot", count=9}
})
-- using raw #tag string (1.21.2+)
content.registerRecipe("mymod:tin_ingot_alt", {
  type="minecraft:crafting_shaped",
  pattern={"WWW","WR ","WWW"},
  key={ W="#minecraft:logs", R={item="minecraft:redstone"} },
  result={id="mymod:tin_ingot", count=4}
})
```

**Shapeless, furnace, etc.:**

```lua
-- shapeless: 1 tin dust from ingot
content.registerRecipe("mymod:tin_dust", {
  type="minecraft:crafting_shapeless",
  ingredients={{item="mymod:tin_ingot"}},
  result={id="mymod:tin_dust", count=1}
})
-- smelting: ore -> ingot (tag ingredient)
content.registerRecipe("mymod:tin_smelting", {
  type="minecraft:smelting",
  category="misc",
  ingredient={tag="c:tin_ores"},
  result={id="mymod:tin_ingot"},
  experience=0.7,
  cookingtime=200
})
-- blasting / smoking / campfire / stonecutting similar
content.registerRecipe("mymod:tin_blasting", {
  type="minecraft:blasting",
  ingredient={tag="c:tin_ores"},
  result={id="mymod:tin_ingot"},
  experience=0.7, cookingtime=100
})
```

**With `id` inside table (single-arg form):**

```lua
content.registerRecipe({ id="mymod:custom", type="minecraft:crafting_shapeless",
  ingredients={{tag="c:tin_ingots"}}, result={id="mymod:tin_nugget", count=9} })
```

**Manage:**

```lua
print(content.getRecipe("mymod:tin_block")) -- -> json string
content.removeRecipe("mymod:tin_block") -- delete
-- /reload after register to reload data pack on integrated server
```

Generated: `data/mymod/recipe/tin_block.json` = `{"type":"minecraft:crafting_shaped","pattern":["###","###","###"],"key":{"#":{"tag":"c:tin_ingots"}},"result":{"id":"mymod:tin_block","count":1}}` (and duplicate in `data/mymod/recipes/`).

::: warning Requires autostart
Call in `neoscripts/autostart/*.lua` before data pack load. After adding, `/reload` on integrated server or new world.
:::

## Model system

`settings.model` accepts:

* vanilla/any mod Identifier `minecraft:block/cube_all`, `minecraft:block/cross`, `minecraft:item/handheld`, `minecraft:block/diamond_block`, `tinker_construct:block/cast_iron`
* short id `minecraft:diamond_block` → expands to `minecraft:block/diamond_block` for blocks, `minecraft:item/...` for items
* file path `config/neoscripts/models/my_model.json` or absolute path — bytes are read and served directly as `models/block/<path>.json` or `models/item/<path>.json`. The JSON can be a full Blockbench/MC model with multiple textures:
```json
{
  "format_version": "1.21.6",
  "credit": "Made with Blockbench",
  "textures": {
    "0": "aj:blueprint/banking_terminal/banking_terminal",
    "2": "aj:blueprint/banking_terminal/banking_terminal_power_off",
    "3": "aj:blueprint/banking_terminal/banking_terminal_screen_blank",
    "particle": "aj:blueprint/banking_terminal/banking_terminal"
  },
  "elements": [
    {
      "from": [8, 2.5, 8.07526],
      "to": [13, 3, 8.57526],
      "faces": {
        "north": {"uv": [0.75, 11, 2, 11.25], "texture": "#0"},
        "east": {"uv": [12.5, 11, 12.75, 11.25], "texture": "#0"},
        "south": {"uv": [11, 1.25, 12.25, 1.5], "texture": "#0"},
        "west": {"uv": [11.25, 12.5, 11.5, 12.75], "texture": "#0"},
        "up": {"uv": [12.25, 1.75, 11, 1.5], "texture": "#0"},
        "down": {"uv": [12.25, 1.75, 11, 2], "texture": "#0"}
      }
    }
  ]
}
```
Texture keys (`"0"`, `"2"`, `"particle"`) are referenced in faces via `"texture": "#0"`. The runtime pack serves the JSON verbatim; place the texture PNGs in your resource pack or the same namespace under `assets/<ns>/textures/...`.

### Multi‑texture support for custom models

When using a custom JSON model (Blockbench export) that references multiple textures via `#0`, `#1`, `particle`, etc., you can supply the texture files from Lua using the `textures` table in settings. Keys must match the texture keys in the model JSON.

**Example model JSON (`config/neoscripts/models/terminal.json`):**
```json
{
  "format_version": "1.21.6",
  "textures": {
    "0": "neoscripts:block/terminal_0",
    "2": "neoscripts:block/terminal_2",
    "3": "neoscripts:block/terminal_3",
    "particle": "neoscripts:block/terminal_particle"
  },
  "elements": [ ... ]
}
```

**Lua registration:**
```lua
local content = require("content")
content.registerBlock("neoscripts:terminal", {
    model = "config/neoscripts/models/terminal.json",
    textures = {
        ["0"] = "config/neoscripts/textures/terminal_base.png",
        ["2"] = "config/neoscripts/textures/terminal_power_off.png",
        ["3"] = "config/neoscripts/textures/terminal_screen_blank.png",
        ["particle"] = "config/neoscripts/textures/terminal_base.png",
    },
    hardness = 3,
    sound = "metal"
})
```

The runtime pack writes textures to:
- `assets/neoscripts/textures/block/terminal_0.png`
- `assets/neoscripts/textures/block/terminal_2.png`
- `assets/neoscripts/textures/block/terminal_3.png`
- `assets/neoscripts/textures/block/terminal_particle.png`

**Rules:**
- Keys in `textures` table (`"0"`, `"2"`, `"particle"`, etc.) must exactly match the keys in the model's `"textures"` object.
- Values are file paths (relative to game dir or absolute) to PNG files.
- The pack serves the model JSON unchanged; only texture files are injected.

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
| `textures` / `textureMap` | table | `nil` | Table of texture key → file path for custom models with multiple textures (Blockbench). Keys must match the model JSON's `textures` object (e.g. `["0"] = "path/tex.png", ["particle"] = "path/particle.png"`). See [Multi‑texture support](#multi-texture-support-for-custom-models). |
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
| `drops` / `drop` / `loot` / `lootTable` | string\|table\|boolean | `nil` | Loot table for block (see [Drops & loot tables](#drops--loot-tables)). `nil` = drop itself, `false`/`{}` = nothing, `"minecraft:diamond"` = one item, `{"minecraft:diamond","minecraft:stick"}` = each own pool (all drop), `{{id="minecraft:diamond", count=3}, {id="minecraft:emerald", min=1, max=3}, {id="minecraft:diamond", weight=10}}` with `count`/`min`/`max`/`weight`/`conditions`. Generates `data/<ns>/loot_table/blocks/<path>.json` (+ legacy `loot_tables`). |
| `ore` / `oreGen` / `generation` / `worldgen` / `vein` | table\|boolean | `nil` | Ore generation (see [Ore generation](#ore-generation)). `true` = default vein, `{size=12,count=20,minY=-24,maxY=70,height="trapezoid",replace="stone_ore_replaceables",biomes="overworld",discardChance=0.0,featureId="ns:custom"}` → `worldgen/configured_feature` + `placed_feature` + `BiomeModifications`. |
| `tags` / `tag` / `itemTags` | string\|table | `nil` | Item tags for recipes (see [Tags](#tags)). `"c:tin_ingots"` or `{"c:tin_ingots","c:ingots/tin"}` or `{{tag="c:tin_ingots"}}` → `data/<tagNs>/tags/item/<path>.json`. On blocks also adds to block tags for convenience. |
| `blockTags` / `block_tags` | string\|table | `nil` | Block tags (`data/<tagNs>/tags/block/<path>.json`). If not set but `tags` is, block tags fallback to `tags`. |
| `mineableTool` / `tool` / `harvestTool` | string | `nil` | Tool type required to drop (`"pickaxe"`,`"axe"`,`"shovel"`,`"hoe"`). Generates `data/minecraft/tags/block/mineable/<tool>.json`. Also `mineable/<tool>` via `blockMineableTool`. |
| `tier` / `miningTier` / `level` | string | `nil` | Tool tier (`"wood"`,`"stone"`,`"iron"`,`"diamond"`,`"netherite"`,`"gold"`). Generates `data/minecraft/tags/block/needs_<tier>_tool.json`. Requires `requiresTool=true`. |
| `requiresTool` / `requiresCorrectTool` | boolean\|string | `false` | `requiresCorrectToolForDrops()`. String value like `"iron"` also sets `tier`. |

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