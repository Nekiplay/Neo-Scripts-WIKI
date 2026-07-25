---
description: Layout helper functions
icon: arrows-left-right
---

# Layout

## Positioning

### `sameLine(offset, spacing)`

Put next widget on the same line.

**Parameters:**
* `offset` (number, optional) - X offset from left edge.
* `spacing` (number, optional) - spacing between items.

```lua
imgui.text("Left")
imgui.sameLine(0, 20)
imgui.text("Right")
```

### `newLine()`

Break to next line.

### `spacing()`

Add vertical spacing (honors style `ItemSpacing`).

### `separator()`

Full-width horizontal line.

### `separatorText(text)`

Separator with centered text.

### `indent(indentWidth)`

Increase indentation.

### `unindent(indentWidth)`

Decrease indentation.

---

## Groups

### `beginGroup()`

Begin a layout group (items are treated as a single unit).

### `endGroup()`

End a layout group.

```lua
imgui.beginGroup()
imgui.text("Group 1")
imgui.button("Button", 100, 20)
imgui.endGroup()

imgui.sameLine(0, 20)

imgui.beginGroup()
imgui.text("Group 2")
imgui.smallButton("Small")
imgui.endGroup()
```

---

## Cursor Control

### `setCursorPos(x, y)`

Set cursor position within the current window.

### `getCursorPos()`

Get cursor position.

**Returns:** (x, y)

### `getCursorScreenPos()`

Get cursor position in absolute screen coordinates.

**Returns:** (x, y)

### `setScrollHereY(centerYRatio)`

Scroll to make the current item vertically visible.

### `setScrollHereX(centerXRatio)`

Scroll to make the current item horizontally visible.

### `getScrollX()`, `getScrollY()`

Get scroll offset.

### `getScrollMaxX()`, `getScrollMaxY()`

Get maximum scroll offset.

### `setScrollX(scrollX)`, `setScrollY(scrollY)`

Set scroll offset.

---

## Content Region

### `getContentRegionAvail()`

Get available content area.

**Returns:** (width, height)

### `getDisplaySize()`

Get display/screen size for imgui context.

**Returns:** (width, height)
