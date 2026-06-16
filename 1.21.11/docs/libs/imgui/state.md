---
description: State query functions
icon: magnifying-glass
---

# State Queries

## Item State

### `isItemHovered(flags)`

Check if the last item is hovered.

**Parameters:**
* `flags` (number, optional) - `HoveredFlags_*`.

**Returns:** (boolean)

### `isItemClicked()`

Check if the last item was clicked.

### `isItemActive()`

Check if the last item is active (pressed/focused).

### `isItemVisible()`

Check if the last item is visible (within scroll view).

### `isItemEdited()`

Check if the last item had its value edited this frame.

### `isItemDeactivated()`

Check if the last item was deactivated this frame.

### `isItemDeactivatedAfterEdit()`

Check if the last item was deactivated after being edited.

### `isItemFocused()`

Check if the last item has keyboard focus.

### `getItemRectMin()`

Get minimum corner of the last item's bounding box.

**Returns:** (x, y)

### `getItemRectMax()`

Get maximum corner of the last item's bounding box.

**Returns:** (x, y)

### `getItemRectSize()`

Get size of the last item's bounding box.

**Returns:** (width, height)

---

## Window State

### `getWindowSize()`

Get current window size.

**Returns:** (width, height)

### `getWindowPos()`

Get current window position.

**Returns:** (x, y)

### `getWindowWidth()`

Get current window width.

### `getWindowHeight()`

Get current window height.

### `isWindowAppearing()`

Check if window just appeared (first frame visible).

### `isWindowCollapsed()`

Check if window is collapsed.

### `isWindowFocused(flags)`

Check if window is focused.

### `isWindowHovered(flags)`

Check if window is hovered.

---

## Keyboard & Mouse

### `isKeyDown(key)`

Check if a keyboard key is down.

### `isKeyPressed(key, repeat)`

Check if a keyboard key was pressed this frame.

### `isKeyReleased(key)`

Check if a keyboard key was released this frame.

### `isMouseDown(button)`

Check if a mouse button is down.

### `isMouseClicked(button, repeat)`

Check if a mouse button was clicked this frame.

### `isMouseReleased(button)`

Check if a mouse button was released this frame.

### `isMouseDoubleClicked(button)`

Check if a mouse button was double-clicked.

### `isMouseDragging(button, lockThreshold)`

Check if a mouse button is dragging.

### `getMousePos()`

Get mouse position.

**Returns:** (x, y)

### `getMouseDragDelta(button, lockThreshold)`

Get mouse drag delta.

**Returns:** (dx, dy)

### `isAnyMouseDown()`

Check if any mouse button is down.

---

## Time & Metrics

### `getFrameCount()`

Get current frame count.

### `getTime()`

Get time in seconds since ImGui context creation.

### `getFontSize()`

Get current font size.

### `getTextLineHeight()`

Get text line height.

### `getTextLineHeightWithSpacing()`

Get text line height with spacing.

### `getFrameHeight()`

Get frame height (button/slider default height).

### `getFrameHeightWithSpacing()`

Get frame height with spacing.
