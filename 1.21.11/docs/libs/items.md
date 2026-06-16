---
description: Item registry lookup library
icon: sword
---

# Items

## `getAll()`

Returns a table of all registered items.

**Returns:**

* (table) List of [Item](../datatypes/item.md) objects.

**Example Usage:**

```lua
-- Example code showing how to use the function
local items = require("items")
local allItems = items.getAll()
for i, item in ipairs(allItems) do
    print(item.name)
end
```

## `getFromId(id)`

Gets an item by its numeric ID.

**Parameters:**

* `id` (number) - Numeric item ID.

**Returns:**

* ([Item](../datatypes/item.md)) Item data, or `nil` if not found.

**Example Usage:**

```lua
-- Example code showing how to use the function
local items = require("items")
local stoneItem = items.getFromId(1)
if stoneItem then
    print("Item name: " .. stoneItem.name)
end
```

## `getFromIdentifier(identifier)`

Gets an item by its identifier string.

**Parameters:**

* `identifier` (string) - Item identifier (e.g. "minecraft:stone").

**Returns:**

* ([Item](../datatypes/item.md)) Item data, or `nil` if not found.

**Example Usage:**

```lua
-- Example code showing how to use the function
local items = require("items")
local diamond = items.getFromIdentifier("minecraft:diamond")
if diamond then
    print("Item ID: " .. diamond.id)
end
```
