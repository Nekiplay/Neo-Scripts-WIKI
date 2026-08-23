---
description: Styling, colors, fonts, and ID stack
icon: paint-brush
---

# Styling

## Style Colors

### `pushStyleColor(idx, r, g, b, a)`

Push a color onto the style color stack.

**Parameters:**
* `idx` (number) - `Col_*` constant.
* `r`, `g`, `b` (number) - RGB values (0.0–1.0 floats).
* `a` (number, optional) - alpha (0.0–1.0, default 1.0).

```lua
local c = imgui.constants
imgui.pushStyleColor(c.Col_Button, 0.2, 0.6, 0.2, 1.0)
if imgui.button("Green Button") then end
imgui.popStyleColor()
```

### `popStyleColor(count)`

Pop the last style color from the stack.

**Parameters:**
* `count` (number, optional) - number of colors to pop (default 1).

---

## Style Variables

### `pushStyleVar(idx, value)`

Push a style variable onto the stack (single-value vars).

### `pushStyleVar(idx, x, y)`

Push a style variable (two-component vars like padding).

**Parameters:**
* `idx` (number) - `StyleVar_*` constant.
* `x` (number) - value or first component.
* `y` (number, optional) - second component (for padding/spacing).

```lua
imgui.pushStyleVar(c.StyleVar_FrameRounding, 8.0)
imgui.button("Rounded Button")
imgui.popStyleVar()
```

### `popStyleVar(count)`

Pop the last style variable.

---

## Fonts

### `createFontObject(filename, mergeMode, pixelSnapH, fontSize, customRanges)`

Load a custom font from a TTF file.
!!CAUTION!! -> this is to be called in the init hook, check [Events](../../general/events.html#registerimguiinitevent-function)

**Parameters:**
* `filename` (string) - path to `.ttf` file.
* `mergeMode` (boolean, optional) - merge with existing fonts (default false).
* `pixelSnapH` (boolean, optional) - snap glyphs to pixels (default true).
* `fontSize` (number) - font size in pixels.
* `customRanges` (table, optional) - custom glyph ranges.

**Returns:** (ImFont object) font handle for use with `pushFont`.

```lua
local font = imgui.createFontObject("path/to/font.ttf", false, true, 18.0)
```

### `pushFont(font)`

Push a font onto the font stack.

```lua
local font = imgui.createFontObject("config/fonts/Roboto.ttf", false, true, 16.0)
imgui.pushFont(font)
imgui.text("This text uses the custom font")
imgui.popFont()
```

### `popFont()`

Pop the last font from the stack.

---

## ID Stack

### `pushID(id)`

Push a new ID onto the ID stack (prevents widget ID conflicts).

### `popID()`

Pop the last ID from the stack.

```lua
for i = 1, 5 do
    imgui.pushID("item" .. i)
    if imgui.button("Click") then print("Item " .. i .. " clicked") end
    imgui.popID()
end
```
