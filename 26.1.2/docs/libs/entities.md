---
description: Entity type registry lookup library
icon: user-alien
---

# Entities

## `getAll()`

Returns a table of all registered entity type identifiers.

**Returns:**

* (table) List of entity type identifier strings (e.g. "minecraft:sheep").

**Example Usage:**

```lua
-- Example code showing how to use the function
local entities = require("entities")
local allEntities = entities.getAll()
for i, entityId in ipairs(allEntities) do
    print(entityId)
end
```
