---
icon: arrows-up-down
---

# Baritone Settings

## Variables

### **allowBreak** (boolean)

### **allowPlace** (boolean)

### **maxFallHeightNoWater** (integer)

### **maxFallHeightBucket** (integer)

### **allowWaterBucketFall** (boolean)

### **pauseMiningForFallingBlocks** (boolean)

### **autoTool** (boolean)

### **assumeExternalAutoTool** (boolean)

### **freeLook** (boolean)

### **blockFreeLook** (boolean)

### **allowParkour** (boolean)

### **allowParkourPlace** (boolean)

## Settable Properties

```lua
local baritone = require("baritone")
local settings = baritone.settings
if settings then
    settings.allowBreak = true
	settings.allowPlace = true
	settings.maxFallHeightNoWater = 3
	settings.maxFallHeightBucket = 100
	settings.allowWaterBucketFall = true
	settings.pauseMiningForFallingBlocks = true
	settings.autoTool = false
	settings.assumeExternalAutoTool = true
	settings.freeLook = true
	settings.blockFreeLook = true
	settings.allowParkour = true
	settings.allowParkourPlace = true
end
```
