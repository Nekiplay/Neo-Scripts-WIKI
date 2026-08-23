---
icon: gears
---

# General

Global functions available in every server script.

## `print(...)`

Prints a message to the server log.

**Parameters:**

* `...` - Any values, separated by spaces.

**Example Usage:**

```lua
print("Hello from the server!", 42, true)
```

## `currentScriptName`

Name of the currently running script.

**Returns:**

* (string) Script name.

**Example Usage:**

```lua
print("My name is " .. currentScriptName)
```

## `require(module)`

Loads a module by name. System modules (`server`, `json`, `threads`, etc.) and local script modules from the scripts directory are supported.

**Parameters:**

* `module` (string) - Module name or path.
* `cache` (boolean) - Optional. Cache the result (default `false`).

**Example Usage:**

```lua
local server = require("server")
local mylib = require("mylibs/utils", true)
```
