---
description: Baritone API
icon: cat
---

# Baritone API

## Variables

### **settings** ([Baritone Settings](settings.md))

### **pathing_behavior** ([Baritone Pathing Behavior](pathing_behavior.html))

### **mining_behavior** ([Baritone Mining Behavior](mining_behavior.html))

## Functions

### `execute(command)`

Execute baritone command alias: `executeCommand`

**Parameters:**

* `command` (string).

**Return:**;

* true

**Example Usage:**

```lua
-- Example code showing how to use the function
local baritone = require("baritone")
baritone.execute("goto 100 ~ 100")
```

