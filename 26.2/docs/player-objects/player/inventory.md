---
description: Inventory functions
icon: backpack
---

# Inventory

## Variables

### [carriedItem](../../datatypes/item.md)

## Functions

## `isAnyScreenOpened()`

Returns true if any screen opened.

**Returns:**

* (boolean).

```lua
-- Example code showing how to use the function
local player = require("player")
local isOpened = player.inventory.isAnyScreenOpened()
```

## `isSignOpened()`

Returns true if sign opened.

**Returns:**

* (boolean).

```lua
-- Example code showing how to use the function
local player = require("player")
local isOpened = player.inventory.isSignOpened()
```

## `getSignText(line)`

Returns line of sign.

**Returns:**

* (string).

```lua
-- Example code showing how to use the function
local player = require("player")
if player.inventory.isSignOpened() then
    local line = player.inventory.getSignText(0)
end
```

## `setSignText(line, text)`

Returns true if success.

**Returns:**

* (boolean) return `true` is successfully.

```lua
-- Example code showing how to use the function
local player = require("player")
if player.inventory.isSignOpened() then
    local status = player.inventory.setSignText(0, "1000")
end
```

## `doneSign()`

Returns true if success.

**Returns:**

* (boolean) return `true` is successfully.

```lua
-- Example code showing how to use the function
local player = require("player")
if player.inventory.isSignOpened() then
    local status = player.inventory.setSignText(0, "1000")
    player.inventory.doneSign()
end
```

## `getChestTitle()`

Returns chest title.

**Returns:**

* (string).

```lua
-- Example code showing how to use the function
local player = require("player")
local title = player.inventory.getChestTitle()
```

## `getStack(slot)`

Returns the item in the slot.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* ([item data](../../datatypes/item.md)).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local item = player.inventory.getItemStack(36)
```

## `getStackFromContainer(slot)`

Returns the item in the slot.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* ([item data](../../datatypes/item.md)).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local item = player.inventory.getItemStackFromContainer(36)
```

## `getContainerSlots()`

Returns the number of slots in an open container.

**Returns:**

* (number) - Int.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local slots = player.inventory.getContainerSlots()
```

## `getContainerTitle()`

Returns the title of the open container (alias for getChestTitle).

**Returns:**

* (string).

**Example Usage:**

```lua
local player = require("player")
local title = player.inventory.getContainerTitle()
player.addMessage(title)
```

## `setStack(slot, item)`

Sets an item in the player's inventory slot.

**Parameters:**

* `slot` (number) - Slot id.
* `item` ([item data](../../datatypes/item.md)) - Item to set.

**Returns:**

* (boolean).

**Example Usage:**

```lua
local player = require("player")
local creator = require("creator")
local stone = creator.createItemStackFromIdentifier("minecraft:stone")
player.inventory.setStack(0, stone)
```

## `setItemInContainer(slot, item)`

Sets an item in a container slot (chest, etc.).

**Parameters:**

* `slot` (number) - Slot id.
* `item` ([item data](../../datatypes/item.md)) - Item to set.

**Returns:**

* (boolean).

**Example Usage:**

```lua
local player = require("player")
local creator = require("creator")
local stone = creator.createItemStackFromIdentifier("minecraft:stone")
player.inventory.setItemInContainer(0, stone)
```

## `leftClick(slot)`

Returns true if successfully.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* (boolean).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.inventory.leftClick(0)
```

## `middleClick(slot)`

Returns true if successfully.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* (boolean).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.inventory.middleClick(0)
```

## `shiftLeftClick(slot)`

Shift-left click on a slot. Moves items between container and player inventory.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* (boolean).

**Example Usage:**

```lua
local player = require("player")
player.inventory.shiftLeftClick(0) -- must have inventory open to grab the item
```

## `shiftRightClick(slot)`

Shift-right click on a slot.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* (boolean).

**Example Usage:**

```lua
local player = require("player")
player.inventory.shiftRightClick(0)
```

## `rightClick(slot)`

Returns true if successfully.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* (boolean).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.inventory.rightClick(0)
```

## `drop(slot)`

Drops a single item from the specified slot.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* (boolean).

**Example Usage:**

```lua
local player = require("player")
player.inventory.drop(0)
```

## `dropAll(slot)`

Returns true if successfully.

**Parameters:**

* `slot` (number) - Slot id.

**Returns:**

* (boolean).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.inventory.dropAll(0)
```

## `closeScreen()`

Closes an open screen (chest, inventory, etc.)

**Returns:**

* (boolean).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.inventory.closeScreen()
```

## `openInventory()`

Open player inventory

**Returns:**

* (boolean).

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.inventory.openInventory()
```
