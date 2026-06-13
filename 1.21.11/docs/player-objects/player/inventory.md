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

* (boolean) return <mark style="color:$success;">**true**</mark> is successfully.

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

* (boolean) return <mark style="color:$success;">**true**</mark> is successfully.

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
local item = player.inventory.getStack(36)
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
local item = player.inventory.getStackFromContainer(36)
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

## `rightClick(slot)`

##

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
