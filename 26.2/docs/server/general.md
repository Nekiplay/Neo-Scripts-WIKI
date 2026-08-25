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

## `modVersion`

Current version of the Neo Scripts mod, taken from the Fabric mod metadata.

**Returns:**

* (string) Mod version, for example `"1.2.2.0.4"`.

**Example Usage:**

```lua
print("Neo Scripts " .. modVersion)
```

## `require(module)`

Loads a module by name. System modules (`server`, `json`, `threads`, etc.) and local script modules from the scripts directory are supported.

**Parameters:**

* `module` (string) - Module name or path.
* `cache` (boolean) - Optional. Cache the module return value so subsequent requires return it instantly (default `false`).

**Example Usage:**

```lua
local server = require("server")
local mylib = require("mylibs/utils", true)
```
