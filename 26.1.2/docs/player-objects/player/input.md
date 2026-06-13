---
icon: keyboard
---

# Input

## `attackEntity()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
local player = require("player")
player.input.attackEntity()
```

## `attackBlock()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
local player = require("player")
player.input.attackBlock()
```

## `mineBlock()`
* Mine current looking block

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
local player = require("player")
player.input.mineBlock()
```

## `setSelectedSlot(slot)`

**Parameters:**

* `slot` (number) (0-8 range).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local status = player.input.setSelectedSlot(0)
```

## `getSelectedSlot()`

**Returns:**

* (number) Range 0-8.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local slot = player.input.getSelectedSlot()
```

## `silentUse(slot)`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local status = player.input.silentUse(0)
```

## `leftClick()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local status = player.input.leftClick()
```

## `rightClick()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local status = player.input.rightClick()
```

## `setPressedSprinting(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedSprinting(true)
```

## `setPressedJump(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedJump(true)
```

## `setPressedSneak(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedSneak(true)
```

## `setPressedForward(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedForward(true)
```

## `setPressedBack(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedBack(true)
```

## `setPressedLeft(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedLeft(true)
```

## `setPressedRight(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedRight(true)
```

## `setPressedAttack(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedAttack(true)
```

## `setPressedUse(enable)`

**Parameters:**

* `enable` (boolean).

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if successfully.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
player.input.setPressedUse(true)
```

## `isPressedSprinting()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedSprinting()
```

## `isPressedJump()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedJump()
```

## `isPressedSneak()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedSneak()
```

## `isPressedForward()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedForward()
```

## `isPressedBack()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedBack()
```

## `isPressedLeft()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedLeft()
```

## `isPressedRight()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedRight()
```

## `isPressedAttack()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedAttack()
```

## `isPressedUse()`

**Returns:**

* (boolean) Return <mark style="color:$success;">**true**</mark> if pressed.

**Example Usage:**

```lua
-- Example code showing how to use the function
local player = require("player")
local pressed = player.input.isPressedUse()
```
