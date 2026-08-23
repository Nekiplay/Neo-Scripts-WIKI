---
description: ImGui component categories overview
icon: puzzle-piece
---

# Components

ImGui components are grouped by purpose. Each category has its own dedicated page.
However it would appear that some sizing flags or setting table column sizes crashes on init. (or maybe i'm stupid: smarrtie)

| Component | Page | Description |
|-----------|------|-------------|
| **Window** | [Windows](window.md) | Creating windows, child regions, window state manipulation |
| **Widgets** | [Widgets](widgets.md) | All interactive elements: buttons, inputs, sliders, lists, color pickers, images, plots |
| **Layout** | [Layout](layout.md) | Arranging elements: sameLine, groups, indentation, cursor control, scrolling |
| **Tables** | [Tables](tables.md) | Data grid tables with columns, headers, and rows |
| **Menus & Popups** | [Menus & Popups](menus.md) | Menu bars, dropdown menus, popup dialogs, tooltips, tab bars, tree nodes |
| **Styling** | [Styling](styling.md) | Colors, style variables, fonts, ID stack |
| **State Queries** | [State Queries](state.md) | Hover/click/active checks, window metrics, keyboard/mouse input state |

## Quick Reference

### Widget Return Values

Most widgets return `changed, newValue`:

```lua
local changed, newVal = imgui.checkbox("Enable", state)
if changed then state = newVal end
```

### Window Pattern

```lua
if imgui.begin("My Window", flags) then
    -- content here
end
imgui.endBegin()
```

### Constants

All flags and color indices are in `imgui.constants`:

```lua
local c = imgui.constants
imgui.begin("No Resize", c.WindowFlags_NoResize)
imgui.pushStyleColor(c.Col_Button, 0.2, 0.6, 0.2, 1.0)
```
