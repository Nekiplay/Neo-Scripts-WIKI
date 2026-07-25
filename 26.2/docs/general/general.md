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

### `unregisterCommand(commandName)`

Unregister a previously registered command.

**Parameters:**

* `commandName` (string).

**Example Usage:**

```lua
unregisterCommand("config")
```

## Modules API

### `modules.getLoadedScripts()`

Returns a list of loaded script names.

**Returns:**

* (table) List of script names.

**Example Usage:**

```lua
local modules = require("modules")
local scripts = modules.getLoadedScripts()
for _, name in ipairs(scripts) do
    print("Loaded script:", name)
end
```

### `modules.getScriptRequirements(scriptName)`

Returns the dependency tree for a script.

**Parameters:**

* `scriptName` (string).

**Returns:**

* (table) Dependency tree with name, dependencies, circular flags.

### `modules.loadScript(path)`

Load a script from file path.

**Parameters:**

* `path` (string) - file path to script.

**Returns:**

* (boolean)

**Example Usage:**

```lua
local modules = require("modules")
modules.loadScript("config/neoscripts/scripts/my_script.lua")
```

### `modules.unloadScript(name)`

Unload a script by name.

**Parameters:**

* `name` (string).

**Returns:**

* (boolean)
