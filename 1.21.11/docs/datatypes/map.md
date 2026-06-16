---
icon: map-location
---

# Map

## Variables

### **scale** (_number_)

### **locked** (_boolean_)

### **tracking\_position** (_boolean_)

### **unlimited\_tracking** (_boolean_)

### **dimension** (_string_)

### **center\_x** (_number_)

### **center\_z** (_number_)

### **is\_exploration\_map** (_boolean_)

### **tracked\_decoration\_count** (_number_)

### **banners** (_list_) { id, name, color, x, y, z }

### **decorations** (_list_) { type, x, y, rot, name }

### **frame\_markers** (_list_) { id, entity\_id, x, y, z, rotation }

### **color\_data** (_list_) - 2D table of color values (128x128)

### **colors** (_list_) - raw flat array of color values (16384 entries)

## Functions

### `getColor(x, z)`

Get color from map.

**Returns:**
* (number) Return color.

**Example Usage:**
```lua
local map_item = player.inventory.getStack(8)
local map_data = map_item.map
if map_data then
    local color = map_data.getColor(0, 0)
end
```

### `updateColor(x, z, color)`

Update color in map.

**Returns:**
* (number) New color.

**Example Usage:**
```lua
local map_item = player.inventory.getStack(8)
local map_data = map_item.map
if map_data then
    map_data.updateColor(0, 0, 0) -- 0 color is transparent
end
```
