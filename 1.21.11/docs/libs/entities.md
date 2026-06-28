---
description: Entity type registry lookup library
icon: user-alien
---

# Entities

## `getAll()`

Returns a table of all registered entity type identifiers.

**Returns:**

* (table) List of entity type identifier strings (e.g. "entity.minecraft.sheep").

**Example Usage:**

```lua
-- Example code showing how to use the function
local entities = require("entities")
local allEntities = entities.getAll()
for i, entityType in ipairs(allEntities) do
    print(entityType)
end
```
