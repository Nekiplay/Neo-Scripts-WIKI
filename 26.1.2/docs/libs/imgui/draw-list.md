---
description: Imgui draw list
icon: pencil
---

# Draw list

## `renderLine(object)`

Render line

**Parameters:**

* `object` (table).

**Example Usage:**

```lua
-- An example on how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function(context)
    local line = {
            x1 = 100, y1 = 100,
            x2 = 110, y2 = 110,
            red = 255, green = 0, blue = 0, alpha = 255
        } -- same applies to lines, coordinates are in pixels
    imgui.dl.renderLine(line)
end)
```

## `renderPolygon(object)`

Render polygon

**Parameters:**

* `object` (table).

**Example Usage:**

```lua
-- An example on how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function(context)
    local polygon = {
           points = {
            { x = 300, y = 150 },
            { x = 400, y = 150 },
            { x = 400, y = 250 },
            { x = 300, y = 250 },
        },
           red = 255, green = 0, blue = 0, alpha = 255
    } -- coordinates are set in PIXELS not minecraft ui coordinates
    imgui.dl.renderPolygon(polygon)
end)
```

## `renderText(object)`

Render text

**Parameters:**

* `object` (table).

**Example Usage:**

```lua
-- An example on how to use the function
local imgui = require("imgui")
registerImGuiRenderEvent(function(context)
    imgui.dl.renderText{
        x = 100, y = 100,
        text = "Hello",
        red = 255, green = 255, blue = 255, alpha = 255
    }
end)
```

## `renderImage(object)`

Render image

**Parameters:**

* `object` (table).

**Example Usage:**

```lua
-- An example on how to use the function
local imgui = require("imgui")
local compost_image = imgui.createImageObject()
local loading_result = compost_image.loadImage("config/neoscripts/scripts/images/compost.png")

registerUnloadCallback(function()
    compost_image.release()
end)

registerImGuiRenderEvent(function(context)
    imgui.dl.renderImage{
		textureID = compost_image.getId(),
		
		x = 0, y = 0,
		width = 16, height = 16,
		
		uvMinX = 0, uvMinY = 0,
		uvMaxX = 1, uvMaxY = 1,
	
        
        red = 255, green = 255, blue = 255, alpha = 255
    }
end)
```
