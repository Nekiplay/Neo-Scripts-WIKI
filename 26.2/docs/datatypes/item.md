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

## Functions

### `isCorrectToolForDrops(block)`

Check if this item is the correct tool for mining a block.

**Parameters:**
* `block` ([block](block.md) or [BlockState](block.md)).

**Returns:**
* (boolean)

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
