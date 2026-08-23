---
icon: server
---

# Server

Server-side Lua API for **Neo Scripts**.

Scripts are loaded from the **world folder**: `<world folder>\neoscripts\scripts\`

For example, for the world `world` it is `world\neoscripts\scripts\`

Names of scripts that are automatically loaded on server start: **autoload.lua**, **startup.lua**, **init.lua**

Server scripts run on the dedicated server (or integrated server host) and have access to:

* [General](/server/general.md) - global functions (`print`, `currentScriptName`, `require`)
* [Events](/server/events.md) - tick handlers and interaction callbacks
* [Server](/server/server.md) - `require("server")` - levels and online players
* [World](/server/world.md) - world object returned by `server.getLevel(...)`
