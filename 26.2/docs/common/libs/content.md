---
description: Dynamic registration of items and blocks from Lua (before registry freeze).
icon: cube
---

# Content

Dynamic content registration library. Available via `require("content")` on both client and server.

::: warning Requires autostart
All `register*` functions must be called **before registries freeze** — i.e. from scripts in `neoscripts/autostart/*.lua`. That folder is executed from `ServerMain.onInitialize` on both sides (before the first resource load). Calls from `/lua` or `WindowMixin` autoload (`config/neoscripts/scripts/autoload.lua`) work via freeze-fallback but textures may require `F3+T`.
:::

The library creates a runtime resource pack (`neoscripts_dynamic_content`, `required`+`fixed`, `BOTTOM` priority) with generated assets so other packs/mods can override the models.

## `createSettings([table])`

Create a `content_settings` object (see [LuaContentSettings](#luacontentsettings)). All fields are optional. Also aliased as `contentSettings` / `itemSettings` / `blockSettings`.

**Parameters:**

* `table` (table, optional) — initial values `{ name, texture, maxStackSize, fireResistant, rarity, durability, craftRemainder, enchantable, useCooldown, hardness, resistance, luminance, friction }`

**Returns:**

* (`content_settings`) mutable settings object. Fields can be read/written afterwards (`settings.name = "..."`).

**Example:**

```lua
local content = require("content")
local settings = content.createSettings({
    name = "My Item",
    texture = "neoscripts/autostart/golden_carrot.png",
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
- `assets/<ns>/items/<path>.json` → `{"model":{"type":"minecraft:model","model":"<ns>:item/<path>"}}`
- `assets/<ns>/models/item/<path>.json` → `{"parent":"minecraft:item/generated","textures":{"layer0":"<ns>:item/<path>"}}`
- `assets/<ns>/textures/item/<path>.png` → PNG bytes

## `registerBlock(id [, settings])`

Register a new block (`Block(Properties.of().setId(key))`). For custom name overrides `Block#getName()`.

**Parameters:**

* `id` (string)
* `settings` (content_settings | table, optional) — `hardness`, `resistance`, `luminance` (0..15), `friction` are block-specific.

**Returns:**

* ([Block](../datatypes/block.md)) default `BlockState` wrapper (`LuaBlockState`) on success.

**Example:**

```lua
local content = require("content")
local state = content.registerBlock("neoscripts:ruby_block", { hardness = 3, resistance = 6, luminance = 5 })
print(state.name)
```

## `registerBlockItem(id, blockState [, settings])`

Register a `BlockItem` for a previously registered block.

**Parameters:**

* `id` (string) — item id (usually same as block id).
* `blockState` ([Block](../datatypes/block.md) | `BlockState`) — result of `registerBlock`.
* `settings` (content_settings | table, optional) — item properties (name, texture, stack size, etc.). Argument order is flexible: `(id, state, settings)` or `(id, settings, state)`.

**Returns:**

* (string) — item identifier string, `nil` on failure.

**Example:**

```lua
local content = require("content")
local blockState = content.registerBlock("neoscripts:ruby_block")
local itemId = content.registerBlockItem("neoscripts:ruby_block", blockState, { name = "Ruby Block" })
```

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

## LuaContentSettings

Mutable userdata `content_settings` (`typename() == "content_settings"`). Fields via `get`/`set`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | string\|Component | `nil` | Display name. Accepts plain string or `text-builder` component (`toComponent().string`). Overrides `Item#getName` / `Block#getName`. |
| `texture` | string | `nil` | File path to PNG on disk (like `TwoRenderObject.renderImage`), e.g. `"neoscripts/autostart/icon.png"`. Read at registration. |
| `maxStackSize` | integer | `64` | `Item.Properties.stacksTo` (1..99). |
| `fireResistant` / `fire_resistant` | boolean | `false` | `fireResistant()`. |
| `rarity` | string | `nil` | `"common"`, `"uncommon"`, `"rare"`, `"epic"` → `Rarity`. |
| `durability` | integer | `nil` | `durability(int)`. |
| `craftRemainder` / `craft_remainder` | string | `nil` | Identifier of remainder item (e.g. `"minecraft:bucket"`). |
| `enchantable` | integer | `nil` | `enchantable(int)`. |
| `useCooldown` / `use_cooldown` | number | `nil` | `useCooldown(float)` seconds. |
| `hardness` | number | `nil` | Block `strength(hardness, resistance)` — hardness part. |
| `resistance` | number | `nil` | Block explosion resistance. |
| `luminance` | integer | `nil` | `lightLevel` 0..15. |
| `friction` | number | `nil` | `friction(float)`. |

All keys accept both `camelCase` and `snake_case` (`maxStackSize` / `max_stack_size`).