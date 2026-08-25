---
description: Returned information about items
icon: sword
---

# Item

## Variables

**count** (_number_)

**max\_count** (_number_)

**name** (_string_)

**id** (_number_) - numeric item ID

**identifier** (_string_) (example: minecraft:coal_ore)

**translation_id** (_string_) (example: item.minecraft.coal_ore)

**blockstate** ([block](block.md))

**display\_name** (_string_)

**is\_empty** (_boolean_)

**is\_stackable** (_boolean_)

**is\_enchanted** _(boolean)_

**is\_sword** (_boolean_) - is item in sword tag

**is\_pickaxe** (_boolean_)

**is\_axe** (_boolean_)

**is\_hoe** (_boolean_)

**is\_shovel** (_boolean_)

**is\_map** (_boolean_)

**is\_trident** (_boolean_)

**is\_instrument** (_boolean_)

**is\_shield** (_boolean_)

**is\_shears** (_boolean_)

**is\_mace** (_boolean_)

**is\_fishing_rod** (_boolean_)

**is\_block** (_boolean_) - is block item

**head\_texture** (_string_)

**skyblock\_id** (_string_)

**neu\_id** (_string_)

**uuid** (_string_)

**reforge\_modifier** (_string_)

**is\_recombobulated** (_boolean_)

**is\_museum\_donated** (_boolean_)

**lore** (_table list_)

**enchantments** / **ench** (_table list_) - vanilla enchantments

**hypixel\_enchantments** / **hypixel\_ench** (_table list_) - Hypixel enchantments with name and level fields

**map** ([map](map.md))

**nbt** (_string_) - item NBT data

**profile** (_table_) - player head profile of the item (only for items with a profile component, e.g. player heads):
* `id` (_table_) - UUID split into 4 numbers
* `name` (_string_)
* `properties` (_table list_) - properties with fields `name`, `value`, `signature` (e.g. the `textures` property)

**lores** - alias for `lore`

### Custom variables

Any unknown property name acts as a **custom variable** stored in the item's `CUSTOM_DATA` component. Works on both the server and the client. Values can be booleans, numbers, strings, lists (`{1, 2, 3}`) or tables (`{a = 1}`); reading returns the same shape (booleans are stored as NBT bytes, so they read back as numbers). Setting a variable to `nil` removes it.

> [!NOTE]
> Changes made on the **server** are permanent and synced to clients together with the item.
> Changes made on the **client** only modify the local copy of the item and are discarded when the server re-syncs the slot (e.g. on window reopen or item move).

**Example Usage (server):**

```lua
-- tag an item
item.my_data = { owner = "Neki_play", charges = 3 }
print(item.my_data.charges) -- 3
print(item.my_data.owner)   -- "Neki_play"

item.my_charges = 5
item.my_flag = true

-- delete
item.my_data = nil
```

**Example Usage (client):**

```lua
local player = require("player")
local item = player.inventory.getStack(0)
if item and not item.is_empty then
    print(item.my_charges) -- reads data written by a server script
end
```

## Functions

### `item["is_correct_tool"](block)`

Check if this item is the correct tool for mining a block.

**Parameters:**
* `block` ([block](block.md) or [BlockState](block.md)).

**Returns:**
* (boolean)

**Example Usage:**

```lua
local blocks = require("blocks")
local stone = blocks.getBlock("minecraft:stone")
print(item.is_correct_tool(stone))
```

## Settable Properties

```lua
local player = require("player")
local item = player.inventory.getStack(0)
if item then
    item.display_name = "§cCustom Name"
    item.count = 16
    item.lore = {"Line 1", "Line 2", "Line 3"}
end
```

Additional writable properties:

* **display\_name** (`nil`) - setting to `nil` removes the custom name
* **count** (_number_) - clamped between `1` and `max_count`
* **lore** / **lores** (_table_) - empty table removes the lore
* **profile** (_table_) - sets the player head profile (skin texture without signature):

```lua
item.profile = {
    -- optional, random UUID if omitted
    id = { 123456789, -2044773845, -1075434026, -1900000000 },
    properties = {
        {
            name = "textures",
            value = "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUv...."
        }
    }
}
```
