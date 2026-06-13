---
description: GUI library
icon: browser
---

# ImGUI

## Variables

### [constants](constants.md)

### [dl](draw-list.md)

## `begin(title, flags)`

Function to specify the beginning of the window

**Parameters:**

* `title` (string).
* `flags` (integer) (optional)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local window_flags = imgui.constants.WindowFlags_NoResize

registerImGuiRenderEvent(function()
    if imgui.begin("Test", window_flags) then
    end
    imgui.endBegin()
end)
```

## `endBegin()`

Function to specify the ends of the window

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local window_flags = imgui.constants.WindowFlags_NoResize

registerImGuiRenderEvent(function()
    if imgui.begin("Test", window_flags) then
        
    end
    imgui.endBegin()
end)
```

## `text(text)`

Plain text

**Parameters:**

* `text` (string).

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        imgui.text("ImGUI from Lua!")
    end
    imgui.endBegin()
end)
```

## `textDisabled(text)`

Text with color turned off

**Parameters:**

* `text` (string).

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        imgui.textDisabled("Disabled text")
    end
    imgui.endBegin()
end)
```

## `textColored(red, green, blue, text)`

Colored text

**Parameters:**

* `red` (number).
* `green` (number).
* `blue` (number).
* `text` (string).

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        imgui.textColored(1.0, 0.0, 0.0, 1.0, "Red text")
    end
    imgui.endBegin()
end)
```

## `bulletText(text)`

Text with a round piece

**Parameters:**

* `text` (string).

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        imgui.bulletText("Bullet text")
    end
    imgui.endBegin()
end)
```

## `checkbox(text, state)`

Text with a round piece

**Parameters:**

* `text` (string)
* `state` (boolean)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local checkbox_state = false

registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        local checkbox_changed, new_checkbox_state = imgui.checkbox("Check box", checkbox_state)
        if checkbox_changed then
            checkbox_state  = new_checkbox_state 
        end
    end
    imgui.endBegin()
end)
```

## `inputText(text, buffer)`

Text with a round piece

**Parameters:**

* `text` (string)
* `buffer` (string)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local text_buffer = "Hello, ImGUI!"

registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        local text_changed, new_text = imgui.inputText("Text input", text_buffer)
        if text_changed then
            text_buffer = new_text
        end
    end
    imgui.endBegin()
end)
```

## `inputText(text, buffer, wight, height)`

Text with a round piece

**Parameters:**

* `text` (string)
* `state` (boolean)
* `wight` (bumber)
* `height` (number)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local text_buffer = "Hello, ImGUI!"

registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        local multiline_changed, new_multiline = imgui.inputTextMultiline("Multi line input", text_buffer, 200, 100)
        if multiline_changed then
            text_buffer = new_multiline
        end
    end
    imgui.endBegin()
end)
```

## `inputInt(text, int_value, step, step_fast)`

Text with a round piece

**Parameters:**

* `text` (string)
* `buffer` (string)
* `step` (number)
* `step_fast` (number)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local int_value = 0

registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        local int_changed, new_int = imgui.inputInt("Number input", int_value, 1, 100)
        if int_changed then
            int_value = new_int
        end
    end
    imgui.endBegin()
end)
```

## `inputFloat(text, float_value, step, step_fast, format)`

Text with a round piece

**Parameters:**

* `text` (string)
* `buffer` (string)
* `step` (number)
* `step_fast` (number)
* `format` (string)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local int_value = 0

registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        local float_changed, new_float = imgui.inputFloat("Float input", float_value, 0.1, 1.0, "%.3f")
        if float_changed then
            float_value = new_float
        end
    end
    imgui.endBegin()
end)
```

## `listBox(text, current_item, items)`

Text with a round piece

**Parameters:**

* `text` (string)
* `current_item` (number)
* `items` (table)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local listbox_current = 0
local listbox_items = {"Apple", "Banana", "Cherry", "Date"}

registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        listbox_current = imgui.listBox("ListBox", listbox_current, listbox_items)
    end
    imgui.endBegin()
end)
```

## `button(text, width, height)`

A regular button

**Parameters:**

* `text` (string)
* `width` (number)
* `height` (number)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        if imgui.button("Test") then
        
        end
    end
    imgui.endBegin()
end)
```

## `smallButton(text)`

Small button

**Parameters:**

* `text` (string)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        if imgui.smallButton("Test") then
        
        end
    end
    imgui.endBegin()
end)
```

## `arrowButton(id, direction)`

Button with arrows

**Parameters:**

* `id` (string)
* `direction` (number)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        if imgui.arrowButton("##left", 0) then
        
        end
        if imgui.arrowButton("##right", 1) then
        
        end
    end
    imgui.endBegin()
end)
```

## `sameLine(offset, spacing)`

Text with a round piece

**Parameters:**

* `offset` (number)
* `spacing` (number)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        imgui.sameLine(0.0, 0.0)
    end
    imgui.endBegin()
end)
```

## `image(id, wigth, height, uv0X, uv0Y, uv1X, uv1Y)`

Draw image

**Parameters:**

* `id` (number)
* `wigth` (number)
* `height` (number)
* `uv0X` (number)
* `uv0Y` (number)
* `uv1X` (number)
* `uv1Y` (number)

**Example Usage:**

```lua
-- Example code showing how to use the function
local imgui = require("imgui")
local compost_image = imgui.createImageObject()
local loading_result = compost_image.loadImage("config/hypixelcry/scripts/images/compost.png")

registerImGuiRenderEvent(function()
    if imgui.begin("Test") then
        imgui.image(compost_image.getId(), 16, 16, 0, 0, 0, 0) -- Normal
		imgui.image(compost_image.getId(), 16, 16, 0, 1, 1, 0) -- Rotated Y
    end
    imgui.endBegin()
end)

registerUnloadCallback(function()
    compost_image.release()
end)
```
