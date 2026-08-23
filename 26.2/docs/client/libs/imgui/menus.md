---
description: Menus, popups, tabs, tooltips, and tree nodes
icon: list
---

# Menus, Popups, Tabs & Tooltips

## Menu Bar

### `beginMenuBar()`

Begin the window's menu bar (inside a `begin`/`endBegin` block).

**Returns:** (boolean)

### `endMenuBar()`

End the menu bar.

### `beginMainMenuBar()`

Begin the application-level menu bar (outside windows).

**Returns:** (boolean)

### `endMainMenuBar()`

End the application menu bar.

### `beginMenu(label, enabled)`

Begin a dropdown menu.

**Parameters:**
* `label` (string).
* `enabled` (boolean, optional) - default true.

**Returns:** (boolean) true if menu is open.

### `endMenu()`

End a dropdown menu.

### `menuItem(label, shortcut, selected, enabled)`

A menu item.

**Parameters:**
* `label` (string).
* `shortcut` (string, optional) - e.g., `"Ctrl+N"`.
* `selected` (boolean, optional).
* `enabled` (boolean, optional).

**Returns:** (boolean) true when activated.

```lua
if imgui.beginMenuBar() then
    if imgui.beginMenu("File") then
        if imgui.menuItem("New", "Ctrl+N") then print("New") end
        if imgui.menuItem("Open", "Ctrl+O") then print("Open") end
        imgui.separator()
        if imgui.menuItem("Exit") then print("Exit") end
        imgui.endMenu()
    end
    imgui.endMenuBar()
end
```

---

## Popups

### `openPopup(name)`

Mark a popup as open.

### `beginPopup(name, flags)`

Begin popup content.

**Returns:** (boolean) true if popup is open.

### `beginPopupModal(name, flags)`

Begin a modal popup (blocks interaction with other windows).

**Returns:** (boolean)

### `endPopup()`

End popup content.

### `closeCurrentPopup()`

Close the currently open popup.

### `openPopupOnItemClick(trigger)`

Open popup on right-click (or other trigger) on the previous item.

### `isPopupOpen(name)`

Check if a popup is currently open.

```lua
if imgui.button("Open Popup") then
    imgui.openPopup("my_popup")
end

if imgui.beginPopup("my_popup") then
    imgui.text("Popup content")
    if imgui.selectable("Option 1") then end
    if imgui.button("Close") then imgui.closeCurrentPopup() end
    imgui.endPopup()
end
```

---

## Tooltips

### `setTooltip(text)`

Set a tooltip for the preceding item.

```lua
imgui.button("Hover me")
imgui.setTooltip("This is a tooltip!")
```

### `beginTooltip()`

Begin a multi-line tooltip.

**Returns:** (boolean)

### `endTooltip()`

End a multi-line tooltip.

---

## Tabs

### `beginTabBar(id, flags)`

Begin a tab bar.

**Parameters:**
* `strId` (string) - unique identifier.
* `flags` (number, optional) - `TabBarFlags_*`.

**Returns:** (boolean)

### `endTabBar()`

End the tab bar.

### `beginTabItem(label, flags)`

Begin a tab item.

**Returns:** (boolean) true if tab is selected.

### `endTabItem()`

End a tab item.

```lua
if imgui.beginTabBar("MyTabBar") then
    if imgui.beginTabItem("Tab 1") then
        imgui.text("Content of Tab 1")
        imgui.endTabItem()
    end
    if imgui.beginTabItem("Tab 2") then
        imgui.text("Content of Tab 2")
        imgui.endTabItem()
    end
    imgui.endTabBar()
end
```

---

## Tree Nodes

### `treeNode(label)`

Begin a tree node (collapsible).

**Returns:** (boolean) true if expanded.

```lua
if imgui.treeNode("Parent") then
    imgui.text("Child content")
    imgui.treePop()
end
```

### `treeNodeEx(label, flags)`

Tree node with flags.

### `treePop()`

End a tree node.

### `collapsingHeader(label, flags)`

Collapsing header (like tree node that always opens in place).

**Returns:** (boolean) true if expanded.
