---
icon: text
description: A library for building rich text components with click/hover events
---

# Text Builder

**Module names:** `textbuilder`, `text_builder`, `component_builder`, `componentbuilder`

## `new(text)`

Create a new text component builder.

**Parameters:**
* `text` (string) - The initial text.

**Returns:**
* ([ComponentBuilder](text-builder.md))

**Example Usage:**
```lua
local ComponentBuilder = require("text_builder")
local builder = ComponentBuilder.new("Hello!")
```

## `empty()`

Create an empty text component builder.

**Returns:**
* ([ComponentBuilder](text-builder.md))

**Example Usage:**
```lua
local ComponentBuilder = require("text_builder")
local builder = ComponentBuilder.empty()
```

## Formatting Methods

All methods return the builder for chaining.

### `text(text)`
Sets the text content.

**Parameters:**
* `text` (string)

### `color(color)`
Sets the text color.

**Parameters:**
* `color` (string) - Color name (e.g. "red", "gold", "white", "green", "yellow", "blue", "dark_purple", "aqua", "gray") or hex color like "#55FFFF".

### `bold(enable)`
**Parameters:**
* `enable` (boolean)

### `italic(enable)`
**Parameters:**
* `enable` (boolean)

### `underlined(enable)`
**Parameters:**
* `enable` (boolean)

### `strikethrough(enable)`
**Parameters:**
* `enable` (boolean)

### `obfuscated(enable)`
**Parameters:**
* `enable` (boolean)

### `insertion(text)`
Sets text to insert when shift-clicked.

**Parameters:**
* `text` (string)

## Click Events

### `clickRunCommand(command)`
Executes a command when clicked.

**Parameters:**
* `command` (string) - Command to run (e.g. "/spawn").

### `clickSuggestCommand(command)`
Suggests a command in chat when clicked.

**Parameters:**
* `command` (string)

### `clickOpenUrl(url)`
Opens a URL when clicked.

**Parameters:**
* `url` (string)

### `clickCopyToClipboard(text)`
Copies text to clipboard when clicked.

**Parameters:**
* `text` (string)

### `clickChangePage(page)`
Changes book page when clicked.

**Parameters:**
* `page` (number)

## Hover Events

### `hoverText(text)`
Shows text when hovered.

**Parameters:**
* `text` (string) or ([ComponentBuilder](text-builder.md)) or ([Component](component.md))

## Structure

### `append(builder)`
Appends another component builder or string.

**Parameters:**
* `builder` ([ComponentBuilder](text-builder.md) or string)

## Build

### `build()`
Builds the component.

**Returns:**
* ([Component](component.md))

## Complete Example

```lua
local player = require("player")
local ComponentBuilder = require("text_builder")

local message = ComponentBuilder.new("Hello! ")
    :color("white")
    :append(
        ComponentBuilder.new("[Hub]")
            :color("gold")
            :bold(true)
            :underlined(true)
            :clickRunCommand("/hub")
            :hoverText("§eClick here to teleport to hub!")
    )
    :append(
        ComponentBuilder.new(" | ")
            :color("gray")
    )
    :append(
        ComponentBuilder.new("[Copy IP]")
            :color("#55FFFF")
            :clickCopyToClipboard("hypixel.net")
            :hoverText(
                ComponentBuilder.new("Click to copy")
                    :color("yellow")
                    :italic(true)
            )
    )
    :build()

player.addMessage(message)
```
