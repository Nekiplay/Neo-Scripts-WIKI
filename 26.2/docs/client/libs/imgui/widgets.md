---
description: All ImGui widget functions
icon: button
---

# Widgets

ImGui uses an **immediate-mode** paradigm: every frame, you describe the GUI in code. Widgets are functions that both display an element AND handle interaction in one call.

## How Widgets Work

Most interactive widgets return **two values**:

```lua
local changed, newValue = imgui.checkbox("Enable", currentState)
if changed then
    -- Update your state variable
    currentState = newValue
end
```

- **`changed`** (boolean) — true only on the frame the value changes.
- **`newValue`** — the new value after interaction (checkbox state, slider value, etc.).

### Widget Types Overview

| Category | Widgets | Purpose |
|----------|---------|---------|
| **Text** | `text`, `textColored`, `textDisabled`, `bulletText`, `textWrapped`, `labelText`, `separatorText`, `calcTextSize` | Display information, labels, and formatting |
| **Buttons** | `button`, `smallButton`, `arrowButton` | Trigger actions on click |
| **Toggle** | `checkbox`, `radioButton`, `selectable` | Binary or multi-choice selection |
| **Input** | `inputText`, `inputTextMultiline`, `inputInt`, `inputFloat`, `inputDouble` | Free-form text and numeric entry |
| **Sliders & Drags** | `sliderInt`, `sliderFloat`, `vSliderInt`, `vSliderFloat`, `dragInt`, `dragFloat`, `sliderAngle` | Interactive value adjustment |
| **Lists** | `combo`, `beginCombo`, `endCombo`, `listBox` | Select from predefined options |
| **Progress** | `progressBar` | Show completion status |
| **Color** | `colorEdit3`, `colorEdit4`, `colorPicker3`, `colorPicker4`, `colorButton` | Color selection |
| **Image** | `createImageObject`, `image` | Display textures |
| **Plotting** | `plotLines`, `plotHistogram` | Data visualization |
| **Misc** | `dummy`, `alignTextToFramePadding`, `separator`, `newLine`, `spacing`, `separatorText` | Spacers and layout helpers |

### ID Conflicts

If you have multiple widgets with the same label, use `pushID`/`popID` to create unique IDs:

```lua
for i = 1, 5 do
    imgui.pushID("item" .. i)
    if imgui.button("Click") then print("Item " .. i) end
    imgui.popID()
end
```

## Text

### `text(text)`

Display plain text.

**Parameters:**
* `text` (string).

### `textColored(r, g, b, a, text)`

Display colored text. Colors are 0.0–1.0 floats.

**Parameters:**
* `r` (number) - red (0.0–1.0).
* `g` (number) - green (0.0–1.0).
* `b` (number) - blue (0.0–1.0).
* `a` (number, optional) - alpha (0.0–1.0, default 1.0).
* `text` (string) - text to display (5th argument!).

```lua
imgui.textColored(1.0, 0.0, 0.0, 1.0, "Red text")
```

### `textDisabled(text)`

Display grayed-out text.

### `bulletText(text)`

Display text with a bullet point.

### `textWrapped(text)`

Display wrapped text (word-wrap at window edge).

### `labelText(label, text)`

Display a label and value pair.

### `separatorText(text)`

Display a separator line with centered text.

### `calcTextSize(text, hideAfterDoubleHash?, wrapWidth?)`

Calculate text dimensions.

**Returns:** (width, height)

---

## Buttons

### `button(text, width, height)`

Standard push button.

**Returns:** (boolean) true when clicked.

```lua
if imgui.button("Click Me", 120, 30) then
    print("Clicked!")
end
```

### `smallButton(text)`

Compact button.

### `arrowButton(id, direction)`

Arrow button.

**Parameters:**
* `id` (string) - unique ID.
* `direction` (number) - `Dir_Left`, `Dir_Right`, `Dir_Up`, or `Dir_Down`.

---

## Toggle & Select

### `checkbox(text, state)`

Checkbox.

**Parameters:**
* `text` (string).
* `state` (boolean) - current state.

**Returns:** (changed, newState)

```lua
local checked = false
-- in render event:
local changed, newVal = imgui.checkbox("Enable", checked)
if changed then checked = newVal end
```

### `radioButton(text, active)`

Radio button.

**Parameters:**
* `text` (string).
* `active` (boolean) - whether this option is selected.

**Returns:** (boolean) true when clicked.

### `selectable(text, selected, flags, width, height)`

Selectable item (like a button that stays toggled).

**Returns:** (clicked, selected)

---

## Input

### `inputText(label, buffer, flags)`

Single-line text input.

**Parameters:**
* `label` (string).
* `buffer` (string) - initial text.
* `flags` (number, optional) - `InputTextFlags_*`.

**Returns:** (changed, newText)

```lua
local text = "Hello"
local changed, newText = imgui.inputText("Name", text)
if changed then text = newText end
```

### `inputTextMultiline(label, buffer, width, height, flags)`

Multi-line text input.

### `inputInt(label, value, step, stepFast)`

Integer input.

**Returns:** (changed, newValue)

### `inputFloat(label, value, step, stepFast, format)`

Float input.

### `inputDouble(label, value, step, stepFast, format)`

Double-precision float input.

---

## Sliders & Drags

### `sliderInt(label, value, min, max, format, flags)`

Integer slider.

**Returns:** (changed, newValue)

```lua
local changed, val = imgui.sliderInt("Slider", 50, 0, 100)
```

### `sliderFloat(label, value, min, max, format, flags)`

Float slider.

### `vSliderInt(label, sizeX, sizeY, value, min, max, format, flags)`

Vertical integer slider.

### `vSliderFloat(label, sizeX, sizeY, value, min, max, format, flags)`

Vertical float slider.

### `dragInt(label, value, speed, min, max, format, flags)`

Drag-controlled integer.

### `dragFloat(label, value, speed, min, max, format, flags)`

Drag-controlled float.

### `sliderAngle(label, value, minDeg, maxDeg, format, flags)`

Angle slider (radians, displayed as degrees).

---

## Lists & Combo

### `combo(label, currentItem, items, heightInItems)`

Combo box (dropdown).

**Parameters:**
* `label` (string).
* `currentItem` (number) - zero-based index.
* `items` (table) - array of strings.
* `heightInItems` (number, optional) - max visible items.

**Returns:** (changed, newIndex)

```lua
local items = {"Apple", "Banana", "Cherry"}
local idx = 0
local changed, newIdx = imgui.combo("Fruit", idx, items)
if changed then idx = newIdx end
```

### `beginCombo(label, preview, flags)`

Start custom combo box.

**Returns:** (boolean) true if combo is open.

### `endCombo()`

End custom combo box.

### `listBox(label, currentItem, items, heightInItems)`

List box.

**Returns:** (number) new selected index.

```lua
local selected = imgui.listBox("Choose", 0, {"A", "B", "C"})
```

---

## Progress

### `progressBar(fraction, width, height, overlay)`

Progress bar.

**Parameters:**
* `fraction` (number) - 0.0 to 1.0.
* `width` (number, optional) - bar width (-1 = fill).
* `height` (number, optional) - bar height (default 0).
* `overlay` (string, optional) - overlay text.

---

## Color

### `colorEdit3(label, r, g, b, flags)`

Color editor (RGB, floats 0.0–1.0).

**Returns:** (changed, r, g, b)

```lua
local changed, rNew, gNew, bNew = imgui.colorEdit3("Color", r, g, b)
```

### `colorEdit4(label, r, g, b, a, flags)`

Color editor with alpha.

### `colorPicker3(label, r, g, b, flags)`

Color picker modal.

### `colorPicker4(label, r, g, b, a, flags)`

Color picker with alpha.

### `colorButton(label, r, g, b, a, flags, sizeX, sizeY)`

Color preview button.

---

## Image

### `createImageObject()`

Create a texture object for displaying images.

**Returns:** (ImGuiTexture object)

```lua
local tex = imgui.createImageObject()
tex:loadImage("config/neoscripts/scripts/images/icon.png")
```

### `image(textureID, width, height, uvMinX, uvMinY, uvMaxX, uvMaxY)`

Display an image using a texture ID.

**Parameters:**
* `textureID` (number or ImGuiTexture) - texture object or numeric ID.
* `width` (number) - display width.
* `height` (number) - display height.
* `uvMinX`, `uvMinY` (number, optional) - UV min (default 0).
* `uvMaxX`, `uvMaxY` (number, optional) - UV max (default 1).

```lua
local tex = imgui.createImageObject()
tex:loadImage("config/hypixelcry/scripts/images/compost.png")
-- In render event:
imgui.image(tex:getId(), 32, 32)
imgui.image(tex:getId(), 16, 16, 0, 1, 1, 0) -- flipped Y
```

---

## Plotting

### `plotLines(label, values, graphWidth, graphHeight, overlay, scaleMin, scaleMax, stride, offset)`

Line plot.

### `plotHistogram(label, values, graphWidth, graphHeight, overlay, scaleMin, scaleMax, stride, offset)`

Histogram plot.

---

## Misc

### `dummy(width, height)`

Empty space of given size.

### `alignTextToFramePadding()`

Align text baseline with frame padding.

### `separator()`

Horizontal separator line (full width).

### `newLine()`

Line break.

### `spacing()`

Add vertical spacing.

### `separatorText(text)`

Separator with centered text.
