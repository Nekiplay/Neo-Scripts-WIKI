---
description: Player scoreboard object
icon: list
---

# Scoreboard

Scoreboard (tab) object. Works the same on **client** and **server**:

* **Client**: changes are local and visible only to this player.
* **Server**: changes are automatically synced to all clients by the server.

Accessed via [player.getScoreboard()](/client/player-objects/player/README.md#getscoreboard) or [entity.scoreboard](entity.md) (Player entities only).

## Variables

**objectives** (_table list_) - list of all objectives as [Objective](#objective) objects

**display\_slots** (_table list_) - available display slot names (`"list"`, `"sidebar"`, `"below_name"`, `"sidebar.team.gold"`, ...)

## Functions

### `scoreboard.get_objective(name)`

Returns an objective by name.

**Parameters:**

* `name` (_string_) - objective name

**Returns:**

* ([Objective](#objective) or nil)

Aliases: `getObjective`

### `scoreboard.create_objective(name[, criteria][, displayName][, renderType])`

Creates a new objective.

**Parameters:**

* `name` (_string_) - objective name
* `criteria` (_string_, optional) - criteria name, default `"dummy"` (`dummy`, `trigger`, `health`, `deathCount`, ...)
* `displayName` (_string_, optional) - display name, defaults to objective name
* `renderType` (_string_, optional) - `"integer"` (default) or `"hearts"`

**Returns:**

* ([Objective](#objective)) - created objective, or `false` if it already exists

Aliases: `add_objective`

### `scoreboard.remove_objective(name)`

Removes an objective with all its scores.

**Parameters:**

* `name` (_string_) - objective name

**Returns:**

* (_boolean_) - `true` on success

Aliases: `delete_objective`

### `scoreboard.get_score(objective, holder)`

Reads a score without creating it.

**Parameters:**

* `objective` (_string_) - objective name
* `holder` (_string_) - score holder name (player name or fake player)

**Returns:**

* (_number_ or nil) - current value, `nil` if there is no score

### `scoreboard.set_score(objective, holder, value)`

Sets a score (creates it if missing).

**Parameters:**

* `objective` (_string_) - objective name
* `holder` (_string_) - score holder name
* `value` (_number_) - new value

**Returns:**

* (_boolean_) - `true` on success

### `scoreboard.add_score(objective, holder, delta)`

Adds a delta to a score (creates it if missing).

**Parameters:**

* `objective` (_string_) - objective name
* `holder` (_string_) - score holder name
* `delta` (_number_) - amount to add (can be negative)

**Returns:**

* (_boolean_) - `true` on success

### `scoreboard.reset_score(objective, holder)`

Resets (deletes) a single score.

**Parameters:**

* `objective` (_string_) - objective name
* `holder` (_string_) - score holder name

**Returns:**

* (_boolean_) - `true` on success

Aliases: `remove_score`

### `scoreboard.list_scores(objective)`

Lists all scores of an objective.

**Parameters:**

* `objective` (_string_) - objective name

**Returns:**

* (_table list_) - each entry is a table with fields:
  * `owner` (_string_) - score holder name
  * `value` (_number_)
  * `display` (_string_ or nil) - custom display name, if set

### `scoreboard.get_display(slot)`

Returns the objective shown in a display slot.

**Parameters:**

* `slot` (_string_ or _number_) - slot name (see `display_slots`) or slot id

**Returns:**

* ([Objective](#objective) or nil)

### `scoreboard.set_display(slot, objective)`

Shows an objective in a display slot. Passing `nil` clears the slot.

**Parameters:**

* `slot` (_string_ or _number_) - slot name (see `display_slots`) or slot id
* `objective` (_string_ or nil) - objective name

**Returns:**

* (_boolean_) - `true` on success

**Example Usage:**

```lua
local player = require("player")

local sb = player.getScoreboard()

-- Create an objective and show it in the sidebar
sb:create_objective("kills", "dummy", "§cKills")
sb:set_display("sidebar", "kills")

-- Change scores
sb:set_score("kills", "Notch", 10)
sb:add_score("kills", "Notch", 1)
print(sb:get_score("kills", "Notch")) -- 11

-- List scores
for _, entry in ipairs(sb:list_scores("kills")) do
    print(entry.owner, entry.value)
end

-- Remove everything again
sb:set_display("sidebar", nil)
sb:remove_objective("kills")
```

Server-side example (works the same):

```lua
registerServerTick(function()
    local server = require("server")
    local notch = server.getPlayer("Notch")
    if not notch then return end

    local sb = notch.scoreboard -- synced to Notch's client automatically
    local sidebar = sb:get_display("sidebar")
    if sidebar then
        print(sidebar.name, sb:get_score(sidebar.name, "Notch"))
    end
end)
```

---

# Objective

Single scoreboard objective object. Accessed via `scoreboard:get_objective`, `scoreboard:create_objective`, `scoreboard.objectives`, `scoreboard:get_display`.

## Variables

**name** (_string_) - objective name

**display\_name** (_string_) - plain display text (writable)

**criteria** (_string_, read only) - criteria name

**render\_type** (_string_) - `"integer"` or `"hearts"` (writable)

## Writing Variables

```lua
local obj = sb:get_objective("kills")
obj.display_name = "Deaths: " -- plain string
obj.render_type = "hearts"
```

## Functions

### `objective.get_score(holder)`

**Parameters:**

* `holder` (_string_) - score holder name

**Returns:**

* (_number_ or nil) - current value, `nil` if there is no score

### `objective.set_score(holder, value)`

**Parameters:**

* `holder` (_string_) - score holder name
* `value` (_number_) - new value

**Returns:**

* (_boolean_) - `true` on success

### `objective.add_score(holder, delta)`

Adds a delta to a score (creates it if missing).

**Returns:**

* (_boolean_) - `true` on success

### `objective.increment_score(holder)`

Increments a score by 1 and returns the new value.

**Returns:**

* (_number_ or nil) - new value

### `objective.reset_score(holder)`

Resets (deletes) a single score.

**Returns:**

* (_boolean_) - `true` on success

Aliases: `remove_score`

### `objective.list_scores()`

Same as `scoreboard.list_scores(objective)`.

**Returns:**

* (_table list_) - entries with fields: `owner`, `value`, `display`
