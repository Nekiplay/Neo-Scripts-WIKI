---
description: GUI library - full ImGui API reference
icon: browser
---

# ImGUI

Dear ImGui integration for Lua scripts. Provides immediate-mode GUI windows with various widgets.

## Usage

```lua
local imgui = require("imgui")
```

Call ImGui functions inside a `registerImGuiRenderEvent` callback:

```lua
registerImGuiRenderEvent(function()
    if imgui.begin("My Window") then
        imgui.text("Hello!")
    end
    imgui.endBegin()
end)
```

## Widget Categories

| Category | File | Key Functions |
|----------|------|---------------|
| **Components** | [components.md](components.md) | Overview of all component categories |
| **Window** | [window.md](window.md) | `begin`, `endBegin`, `beginChild`, `endChild`, `setNextWindowSize` |
| **Widgets** | [widgets.md](widgets.md) | `text`, `button`, `checkbox`, `sliderInt`, `inputText`, `combo`, `listBox`, `progressBar`, `colorEdit3`, `image` |
| **Layout** | [layout.md](layout.md) | `sameLine`, `newLine`, `spacing`, `separator`, `indent`, `beginGroup`, `cursor` |
| **Tables** | [tables.md](tables.md) | `beginTable`, `tableSetupColumn`, `tableHeadersRow`, `tableNextRow`, `tableSetColumnIndex`, `endTable` |
| **Menus & Popups** | [menus.md](menus.md) | `beginMenuBar`, `beginMenu`, `menuItem`, `beginPopup`, `openPopup`, `beginTabBar`, `beginTooltip`, `treeNode`, `collapsingHeader` |
| **Draw List** | [draw-list.md](draw-list.md) | `dl.renderLine`, `dl.renderText`, `dl.renderRect`, `dl.renderCircle`, `dl.renderImage` |
| **Styling** | [styling.md](styling.md) | `pushStyleColor`, `pushStyleVar`, `pushFont`, `pushID`, font loading |
| **State Queries** | [state.md](state.md) | `isItemHovered`, `getWindowSize`, `getCursorPos`, `getScrollY`, `isKeyDown`, `isMouseClicked` |
| **Constants** | [constants.md](constants.md) | All `WindowFlags`, `Col_*`, `StyleVar_*`, `TableFlags_*`, `Dir_*`, `DrawFlags_*` |

## Submodules

### `imgui.constants`

Table of all ImGui constants:

```lua
local c = imgui.constants
imgui.begin("Window", c.WindowFlags_NoResize + c.WindowFlags_NoMove)
```

### `imgui.dl` (Draw List)

Table of immediate drawing functions for custom rendering on top of ImGui windows:

```lua
local dl = imgui.dl
dl.renderLine{x1=10, y1=10, x2=100, y2=100, red=255, green=0, blue=0, alpha=255}
```
