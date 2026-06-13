---
icon: gears
---

# General

## Variables

### **currentScriptName** (_string_)

## Functions

### `registerCommand(command, function(commandName, args, player), function(autocomplete))`

Send get request.

**Parameters:**

* `command` (string).
* `callback` (function).
* `auto complete` (function)

**Example Usage:**

```lua
-- Example code showing how to use the function
registerCommand("config",
    function(commandName, args, sender)
        local setting = args[1] or ""
        local value = args[2] or ""
        print("Config: " .. setting .. " = " .. value)
    end,
    function(info)
        local parts = {}
        for word in info.fullInput:gmatch("%S+") do
            table.insert(parts, word)
        end
        
        if #parts <= 2 then
            return {"render", "gameplay", "chat", "debug"}
        elseif #parts == 3 then
            local category = parts[2]
            if category == "render" then
                return {"fps", "distance", "shadows", "particles"}
            elseif category == "gameplay" then
                return {"difficulty", "autosave", "hints"}
            elseif category == "chat" then
                return {"filter", "timestamp", "colors"}
            end
        end
        
        return {}
    end
)
```
