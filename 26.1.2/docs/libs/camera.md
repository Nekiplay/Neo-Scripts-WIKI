---
description: Camera matrix and world-to-screen utilities
icon: camera
---

# Camera

The `camera` global provides access to the current frame's view and projection matrices, plus world-to-screen coordinate conversion.

## Usage

```lua
-- camera is a global, no require needed
local view = camera.getViewMatrix()
```

## Functions

### `getViewMatrix()`

Returns the current view matrix as a 4x4 table.

**Returns:** (table) A 4×4 matrix in row-major order — indices 1–16 for sequential access, plus named fields `m00`–`m33`.

```lua
local view = camera.getViewMatrix()
-- Access via index: view[1] = m00, view[2] = m01, ..., view[16] = m33
-- Or by name: view.m00, view.m01, ..., view.m33
```

### `getProjectionMatrix()`

Returns the current projection matrix as a 4x4 table.

**Returns:** (table) Same format as `getViewMatrix`.

```lua
local proj = camera.getProjectionMatrix()
```

### `world2screen(x, y, z)`

Transforms a 3D world coordinate into 2D screen coordinates.

**Parameters:**
* `x` (number) — world X coordinate.
* `y` (number) — world Y coordinate.
* `z` (number) — world Z coordinate.

**Returns:** `screenX, screenY, isVisible`
* `screenX` (number) — screen X in pixels. `nil` if behind the camera.
* `screenY` (number) — screen Y in pixels. `nil` if behind the camera.
* `isVisible` (boolean) — `true` if the point is in front of the camera, `false` otherwise.

```lua
local sx, sy, visible = camera.world2screen(100, 64, 200)
if visible then
  -- render something at (sx, sy)
end
```
