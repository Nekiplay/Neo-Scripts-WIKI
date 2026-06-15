---
icon: bell
---

# Events

## Registration Functions

### `registerUnloadCallback(function)`

Registers a callback when the script is unloaded.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerUnloadCallback(function()
    print("Script unloaded")
end)
```

### `registerClientTick(function)`

Registers a tick handler.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
local tick = 0
registerClientTick(function()
    tick = tick + 1
end)
```

### `registerClientTickPre(function)`

Registers a pre-tick handler.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerClientTickPre(function()
    -- runs before main tick
end)
```

### `registerClientTickPost(function)`

Registers a post-tick handler.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerClientTickPost(function()
    -- runs after main tick
end)
```

### `registerWorldRenderer(function(context))`

Registers a world renderer handler.

**Parameters:**
* `function` (function ([WorldRendererObject](../rendering-objects/world-renderer.md))).

**Example Usage:**
```lua
registerWorldRenderer(function(context)
    local filled = {
        x = 0, y = 0, z = 0,
        red = 255, green = 0, blue = 0, alpha = 140,
        through_walls = false
    }
    context.renderFilled(filled)
end)
```

### `register2DRenderer(function(context))`

Registers a 2D renderer handler.

**Parameters:**
* `function` (function ([2DRendererObject](../rendering-objects/2d-renderer.md))).

**Example Usage:**
```lua
register2DRenderer(function(context)
    local obj2 = {
    	x = 3, y = 3, scale = 1,
    	text = "§6Hypixel Cry §7v1.1.3",
    	red = 0, green = 0, blue = 0
    }
    context.renderText(obj2)
    
    local obj3 = {
    	x = 3, y = 13, scale = 0.75,
    	text = "§7by §bNeki_play§7, §bKreedMan",
    	red = 0, green = 0, blue = 0
    }
    context.renderText(obj3)
end)
```

### `registerImGuiInitEvent(function)`

Registers an ImGui initialization handler.
(usually used to register ImGui fonts)
**Parameters:**
* `function` (function).

**Example Usage:**
```lua
registerImGuiInitEvent(function()
    print("ImGui initialized")
    -- add some fonts here or load images
end)
```

### `registerImGuiRenderEvent(function)`

Registers an ImGui render handler.

**Parameters:**
* `function` (function).

**Example Usage:**
```lua
local imgui = require("imgui")
registerImGuiRenderEvent(function()
    if imgui.begin("My Window") then
        imgui.text("Hello from Lua!")
    end
    imgui.endBegin()
end)
```

### `registerLocationChangeEvent(function(location))`

Registers a Hypixel Skyblock location change handler.

**Parameters:**
* `function` (function (location)).

**Example Usage:**
```lua
registerLocationChangeEvent(function(location)
    print(location)
end)
```

### `registerMessageEvent(function(text, overlay, json))`

Registers a receive message handler.

**Parameters:**
* `function` (function (text, overlay, json)).

**Example Usage:**
```lua
registerMessageEvent(function(text, overlay, json)
    if text and not overlay then
        print(text)
        print(json)
    end
end)
```

### `registerSendMessageEvent(function(text))`

Registers a send message handler.

**Parameters:**
* `function` (function (text)).

**Example Usage:**
```lua
registerSendMessageEvent(function(text)
    if text then
        print(text)
    end
end)
```

### `registerSendCommandEvent(function(text))`

Registers a send command handler.

**Parameters:**
* `function` (function (text)).

**Example Usage:**
```lua
registerSendCommandEvent(function(text)
    if text then
        print(text)
    end
end)
```

### `registerKeyEvent(function(key, action))`

Registers a keyboard and mouse event.

**Parameters:**
* `function` (function (key, action)).

**Example Usage:**
```lua
registerKeyEvent(function(key, action)
    if action == "Release" then
    elseif action == "Press" then
    end
end)
```

### `registerBlockUpdate(function(update))`

Registers a block update event.

**Parameters:**
* `function` (function (update)).

**Example Usage:**
```lua
registerBlockUpdate(function(update)
    local x = update.x
    local y = update.y
    local z = update.z
    local oldState = update.old
    local newState = update.new
end)
```

### `registerUseBlock(function(table))`

Registers a block use event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

**Example Usage:**
```lua
registerUseBlock(function(data)
    print("Used block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
    print("Hand:", data.hand) -- MAIN_HAND or OFF_HAND
    return true -- return false to cancel
end)
```

### `registerAttackBlock(function(table))`

Registers a block attack event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

**Example Usage:**
```lua
registerAttackBlock(function(data)
    print("Attacked block at", data.blockpos.x, data.blockpos.y, data.blockpos.z)
    print("Direction:", data.direction)
    print("Hand:", data.hand)
    return true -- return false to cancel
end)
```

### `registerSlotClick(function(table))`

Registers a slot click event.

**Parameters:**
* `function` (function (table)).

**Example Usage:**
```lua
registerSlotClick(function(data)
    print("Slot:", data.slot) -- top left 0
    print("Button:", data.button) -- left/right click
    print("ClickType:", data.clickType) -- shift-click
end)
```

### `registerTitleEvent(function(text, isSubTitle))`

Registers a title event.

**Parameters:**
* `function` (function (text, isSubTitle)).

**Example Usage:**
```lua
registerTitleEvent(function(text, isSubTitle)
    print("Title:", text, "Subtitle:", isSubTitle)
end)
```

### `registerActionBarEvent(function(text))`

Registers an action bar event.

**Parameters:**
* `function` (function (text)).

**Example Usage:**
```lua
registerActionBarEvent(function(text)
    print("ActionBar:", text)
end)
```

### `registerServerSideRotationEvent(function(yaw, pitch))`

Registers a player rotation event from server. Can cancel by returning false.

**Parameters:**
* `function` (function (yaw, pitch)).

**Example Usage:**
```lua
registerServerSideRotationEvent(function(yaw, pitch)	
    if yaw and pitch then
        if (yaw ~= config.rotations.yaw and pitch ~= config.rotations.pitch) and 
        (pitch ~= 0 and yaw ~= 0) then
            print("You got rotated!")
        end
    end
    return true
end)
```

### `registerServerTeleportEvent(function(x, y, z))`

Registers a player teleport event from server. Can cancel by returning false.

**Parameters:**
* `function` (function (x, y, z)).

**Example Usage:**
```lua
registerServerSideTeleportEvent(function(x, y, z)
	if x and y and z then
		notifications.snowNotifty("Farm Macro", "You got teleported!")
	end
end)
```

### `registerServerSetTimeEvent(function(dayTime, gameTime, tickDayTime))`

Registers a server time set event.

**Parameters:**
* `function` (function (dayTime, gameTime, tickDayTime)).

**Example Usage:**
```lua
registerServerSetTimeEvent(function(dayTime, gameTime, tickDayTime)
    print("Server time set:", dayTime, gameTime)
end)
```

### `registerPlayerSendMovementEvent(function(table))`

Registers a player send movement event. Can cancel by returning false.

**Parameters:**
* `function` (function (table)).

**Example Usage:**
```lua
registerPlayerSendMovementEvent(function(data)
    print("Position:", data.x, data.y, data.z)
    print("Rotation:", data.yaw, data.pitch)
    print("On ground:", data.on_ground)
end)
```

### `registerInventoryItemChange(function(slot, item))`

Executed whenever there is a change in inventory or container.

**Parameters:**
* `function` (function (slot, item)).

**Example Usage:**
```lua
registerInventoryItemChange(function(slot, item)
    if item then
        print("Slot", slot, "changed to", item.name)
    end
end)
```

### `registerSpawnParticle(function(data))`

Executed when a particle spawns.

**Parameters:**
* `function` (function (data)).

**Example Usage:**
```lua
registerSpawnParticle(function(data)
    local id = data.id -- number
    local x = data.x -- number
    local y = data.y -- number
    local z = data.z -- number
    local x_dist = data.x_dist -- number
    local y_dist = data.y_dist -- number
    local z_dist = data.z_dist -- number
    local max_speed = data.max_speed -- number
    local count = data.count -- number
end)
```

### `registerSoundPlay(function(data))`

Executed when a server sends a sound to the player. Can cancel by returning false.

**Parameters:**
* `function` (function (data)).

**Example Usage:**
```lua
registerSoundPlay(function(info)
    print(info.name) -- example: minecraft:block.anvil.place
    print(info.pitch) -- pitch
    print(info.volume) -- volume
    print(info.position) -- position 
end)
```

---

## Unregistration Functions

Each registration function has a corresponding unregister function that removes a specific callback.

Though consider that the mod itself unregisters all hooks on unload.

**Example Usage:**
```lua
local myCallback = registerClientTick(function()
    print("tick")
end)
-- Later:
unregisterClientTick(myCallback)
```
