---
icon: text
---

# Component

Returned by the `text-builder` library when calling `build()`.

## Functions

### `getString()`

Returns plain text without formatting codes.

**Returns:**
* (string)

**Example Usage:**
```lua
local ComponentBuilder = require("text-builder")
local message = ComponentBuilder.new("Hello World!")
    :color("gold")
    :build()
local component = message:getString() -- "Hello World!"
```

### `getFormattedString()`

Returns text with Minecraft formatting codes (§).

**Returns:**
* (string)

**Example Usage:**
```lua
local ComponentBuilder = require("text-builder")
local message = ComponentBuilder.new("Hello World!")
    :color("gold")
    :build()
print(message:getFormattedString()) -- "§6Hello World!"
```

### `getJsonString()`

Returns the JSON representation of the component.

**Returns:**
* (string)

**Example Usage:**
```lua
local ComponentBuilder = require("text-builder")
local message = ComponentBuilder.new("Hello World!")
    :color("gold")
    :build()
local json = message:getJsonString()
```
