---
description: Window management functions
icon: window-maximize
---

# Window Management

## Creating Windows

### `begin(title, flags)`

Begin a new ImGui window. Must be paired with `endBegin()`.

**Parameters:**
* `title` (string) - window title.
* `flags` (number, optional) - combination of `imgui.constants.WindowFlags_*`.

**Returns:** (boolean) true if window is open and content should be drawn.

```lua
local c = imgui.constants
if imgui.begin("My Window", c.WindowFlags_NoResize) then
    imgui.text("Window content")
end
imgui.endBegin()
```

### `endBegin()`

End the current window. Always call after every `begin`.

```lua
if imgui.begin("Test") then
    imgui.text("Content")
end
imgui.endBegin()
```

---

## Child Windows

### `beginChild(id, width, height, border, flags)`

Begin a scrollable child region.

**Parameters:**
* `id` (string) - unique child identifier.
* `width` (number, optional) - child width (0 = fill remaining).
* `height` (number, optional) - child height (0 = fill remaining).
* `border` (boolean, optional) - show border (default false).
* `flags` (number, optional) - `WindowFlags_*`.

**Returns:** (boolean) true if open.

```lua
if imgui.beginChild("ScrollingRegion", 200, 100, true) then
    for i = 1, 50 do
        imgui.text("Line " .. i)
    end
    imgui.endChild()
end
```

### `endChild()`

End a child window.

---

## Next Window Settings

### `setNextWindowSize(width, height, cond)`

Set size for the next window.

**Parameters:**
* `width` (number) - width in pixels.
* `height` (number) - height in pixels.
* `cond` (number, optional) - `Cond_Always`, `Cond_Once`, or `Cond_FirstUseEver`.

### `setNextWindowPos(x, y, cond)`

Set position for the next window.

### `setNextWindowCollapsed(collapsed, cond)`

Set collapsed state for the next window.

### `setNextWindowFocus()`

Give focus to the next window.

### `setNextWindowBgAlpha(alpha)`

Set background alpha for the next window (0.0 = transparent, 1.0 = opaque).

### `setNextWindowContentSize(width, height)`

Set content size hint for the next window.

---

## Window Manipulation

### `setWindowFocus()`

Set window focus to the current window.

### `setWindowSize(width, height)`

Resize the current window.

### `setWindowPos(x, y)`

Move the current window.

### `setWindowCollapsed(collapsed)`

Collapse/expand the current window.
