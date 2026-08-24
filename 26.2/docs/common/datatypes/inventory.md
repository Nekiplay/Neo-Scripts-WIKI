---
description: Player and container inventory object
icon: box-open
---

# Inventory

Inventory object for players and containers (chests, furnaces, etc.).

Accessed via [entity.inventory](entity.md) (Player entities only) or [blockEntity.inventory](blockEntity.md).

For `ServerPlayer` entities inventory changes are automatically synced to the client by the server.

## Slot Indexing

All slot indexes are **1-based** (`1` = first slot, up to `size`).

## Variables

**size** (_number_) - total slot count

**is\_empty** (_boolean_) - whether the whole inventory is empty

## Indexing

Slots can be read and written directly by index. Setting a slot to `nil` clears it:

```lua
local inv = player.entity.inventory

local item = inv[1]     -- get item in first slot (or nil)
inv[2] = item           -- copy item into second slot
inv[3] = nil            -- clear third slot
```

## Functions

### `inventory.get_items()`

Returns a list of non-empty slots.

**Returns:**
* (_table list_) - each entry is a table with fields:
  * `slot` (_number_, 1-based)
  * `item` ([Item](item.md))

### `inventory.give_item(item[, count])`

Adds an item to the inventory: stacks are merged into existing matching stacks first, remaining items go into empty slots.

**Parameters:**
* `item` ([Item](item.md))
* `count` (_number_, optional) - amount to give, defaults to the stack count

**Returns:**
* (_number_) - the amount actually added

### `inventory.take_item(slotOrItem[, count])`

Removes items from the inventory.

**Parameters:**
* `slotOrItem` (_number_ or [Item](item.md) or _string_)
  * _number_ - remove from this specific slot
  * [Item](item.md) / _string identifier_ (e.g. `"minecraft:diamond"`) - remove matching items from any slot
* `count` (_number_, optional) - amount to remove; for a slot it defaults to the whole stack, for an identifier it defaults to `1`

**Returns:**
* (_number_) - the amount actually removed

Aliases: `remove_item`

Alias of `give_item`: `add_item`

### `inventory.set_item(slot, item)`

Sets an item into a specific slot. Passing `nil` clears the slot.

**Parameters:**
* `slot` (_number_, 1-based)
* `item` ([Item](item.md) or `nil`)

**Returns:**
* (_boolean_) - `true` on success

**Example Usage:**

```lua
local player = require("player")
local items = require("items")

local entity = player.entity
if not entity then return end
local inv = entity.inventory

-- Give 64 diamonds
local diamond = items.getFromIdentifier("minecraft:diamond")
if diamond then
    local added = inv.add_item(diamond, 64)
    print("Added " .. added .. " diamonds")
end

-- Count diamonds in inventory
for _, entry in ipairs(inv.get_items()) do
    if entry.item.identifier == "minecraft:diamond" then
        print(entry.slot .. ": " .. entry.item.count)
    end
end

-- Remove all diamonds
local removed = inv.take_item("minecraft:diamond", 64)
print("Removed " .. removed)

-- Put an item into a specific slot
inv.set_item(1, diamond)

-- Direct indexing
local first = inv[1]
inv[9] = nil -- clear hotbar slot 9
```
