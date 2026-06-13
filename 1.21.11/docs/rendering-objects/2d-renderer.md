---
icon: browser
---

# 2D renderer

## `getWindowScale()`

Return minecraft window scale.

**Returns:**

* (table) (width,  height)

**Example Usage:**

```lua
-- Example code showing how to use the function
register2DRenderer(function(context)
   local size = context.getWindowScale()
    local width = size.width
    local height = size.height
end)
```

## `getTextWidth(str)`

raws a 2D text.

**Parameters:**

* `object` (table (x, y, red, green, blue, text))

**Returns:**

* (number)

**Example Usage:**

```lua
-- Example code showing how to use the function
register2DRenderer(function(context)
    local text = "§6Hypixel Cry §7v1.1.3"
    local wigth = context.getTextWidth(text)
end)
```

## `renderText(object)`

Draws a 2D text.

**Parameters:**

* `object` (table (x, y, red, green, blue, text))

**Returns:**

* (boolean) Return true if successfully

**Example Usage:**

```lua
-- Example code showing how to use the function
register2DRenderer(function(context)
    local obj2 = {
    	x = 3, y = 3, scale = 1,
    	text = "§6Hypixel Cry §7v1.1.3",
    	red = 0, green = 0, blue = 0
    }
    context.renderText(obj2)
    
    local obj3 = {
    	x = 3, y = 13, scale = 0.75,
    	text = "§7by §bNeki_play§7, §bKreedMan",
    	red = 0, green = 0, blue = 0
    }
    context.renderText(obj3)
end)
```

## `renderImage(object)`

Draws a 2D text.

**Parameters:**

* `object` (table (x, y, path, width, height))

**Returns:**

* (boolean) Return true if successfully

**Example Usage:**

```lua
-- Example code showing how to use the function
register2DRenderer(function(context)
    local obj = {
    	x = 1, y = 4,
    	width = 16, height = 16,
    	path = "config/neoscripts/scripts/images/logo.png",
    }
    context.renderImage(obj)
end)
```

## `renderRect(object)`

Draws a 2D rectangle.

**Parameters:**

* `object` (table (x, y, width, height, red, green, blue, alpha))

**Returns:**

* (boolean) Return true if successfully

**Example Usage:**

```lua
-- Example code showing how to use the function
register2DRenderer(function(context)
    local obj = {
    	x = 1, y = 1,
    	width = 16, height = 16,
    	red = 255, green = 0, blue = 0,
    }
    context.renderRect(obj)
end)
```

## `renderItemStack(object)`

Draws a 2D Item.

**Parameters:**

* `object` (table)

**Returns:**

* (boolean) Return true if successfully

**Example Usage:**

```lua
-- Example code showing how to use the function
register2DRenderer(function(context)
    local item = player.inventory.getStack(0)
    if item then
        context.renderItemStack{
            x = 3, y = 34,
    	    itemStack = item, scale = 0.75
        }
    end
end
```
