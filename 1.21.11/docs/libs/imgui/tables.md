---
description: Table API for data grids
icon: table
---

# Tables

## `beginTable(name, columns, flags)`

Begin a table.

**Parameters:**
* `name` (string) - unique identifier.
* `columns` (number) - number of columns.
* `flags` (number, optional) - `TableFlags_*`.

**Returns:** (boolean) true if table is active.

```lua
local c = imgui.constants
if imgui.beginTable("Data", 3, c.TableFlags_Borders) then
    imgui.tableSetupColumn("Name", 0)
    imgui.tableSetupColumn("Value", 0)
    imgui.tableSetupColumn("Status", 0)
    imgui.tableHeadersRow()

    for i = 1, 5 do
        imgui.tableNextRow()
        imgui.tableSetColumnIndex(0); imgui.text("Item " .. i)
        imgui.tableSetColumnIndex(1); imgui.text(tostring(i * 10))
        imgui.tableSetColumnIndex(2); imgui.text("Active")
    end

    imgui.endTable()
end
```

## `tableSetupColumn(label, flags, initWidthOrWeight)`

Configure a column.

**Parameters:**
* `label` (string) - column header text.
* `flags` (number, optional) - `TableColumnFlags_*`.
* `initWidthOrWeight` (number, optional) - width or stretch weight.

## `tableHeadersRow()`

Submit all column headers (as defined by `tableSetupColumn`).

## `tableNextRow(flags, minRowHeight)`

Begin a new table row.

## `tableSetColumnIndex(columnIndex)`

Move to a column in the current row (0-based).

## `endTable()`

End the table.

---

## Table Flags

Available via `imgui.constants.*`:

| Flag | Description |
|------|-------------|
| `TableFlags_Resizable` | Allow column resizing |
| `TableFlags_Borders` | All borders |
| `TableFlags_BordersInner` | Inner borders only |
| `TableFlags_BordersInnerH` | Inner horizontal borders |
| `TableFlags_BordersInnerV` | Inner vertical borders |
| `TableFlags_BordersOuter` | Outer borders only |
| `TableFlags_BordersOuterH` | Outer horizontal borders |
| `TableFlags_BordersOuterV` | Outer vertical borders |
| `TableFlags_RowBg` | Alternate row background |
| `TableFlags_ScrollX` | Horizontal scroll |
| `TableFlags_ScrollY` | Vertical scroll |
| `TableFlags_SizingFixedFit` | Fixed column widths |
| `TableFlags_SizingStretchSame` | Stretch all columns equally |
| `TableFlags_NoHostExtendX` | Disable extending last column |
