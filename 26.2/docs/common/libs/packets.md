---
description: Custom packets between logical client and server
icon: paper-plane
---

# Packets

Library `packets` provides reliable custom packets between logical client and server via `neoscripts:lua_packet` payload. Data is serialized to JSON. Tables (including nested), numbers, strings and booleans are supported.

> **Requires:** fabric API networking (`PayloadTypeRegistry` + `ServerPlayNetworking`/`ClientPlayNetworking`). Payload is registered automatically in `client: LuaEvents` and `server: LuaEvents` for both directions.

Require:

```lua
local packets = require("packets")
-- aliases: "packet", "net", "network"
```

---

## Sending

### Client → Server

#### `packets.sendToServer(channel, data)`

Send packet from logical client to server. Returns `true` on success.

**Parameters:**
* `channel` (string) — packet name, e.g. `"balance"`
* `data` (any) — Lua value: number, string, boolean or table (will be converted to JSON)

**Example:**
```lua
local packets = require("packets")

packets.sendToServer("balance", 10)
packets.sendToServer("balance", {10, 20})
packets.sendToServer("stats", {coins = 5000, level = 42})
packets.sendToServer("ping", "hello")
```

Channel sugar — `packets[channel]` returns proxy with bound channel:

```lua
packets["balance"]:sendToServer(10)
packets.balance:sendToServer({value = 10, extra = {1,2,3}})
packets.balance.sendToServer(10) -- same
```

Single value and table are both valid — `10` and `{10}` are serialized as `10` and `[10]` and decoded accordingly on receiver.

### Server → Client

#### `packets.sendToClient(channel, data)` — broadcast

Broadcast to **all** players on server. Returns `true` if at least one player received.

**Parameters:**
* `channel` (string)
* `data` (any)

**Example:**
```lua
local packets = require("packets")
packets.sendToClient("balance", {value = 123})
packets.broadcast("balance", {value = 123}) -- alias
packets.sendToAll("balance", data)          -- alias
packets["balance"]:sendToClient({value = 123})
```

#### `packets.sendToClient(player, channel, data)` — targeted

Send to a single player.

**Parameters:**
* `player` ([Entity](../../common/datatypes/entity.md)) — `LuaEntity` of `ServerPlayer`
* `channel` (string)
* `data` (any)

**Example:**
```lua
registerPacket("balance", function(player, data)
    -- player is ServerPlayer who sent request
    local result = {balance = 999}
    packets.sendToClient(player, "balance", result)
    -- or broadcast: packets.sendToClient("announce", {msg="hi"})
end)
```

Also via proxy:

```lua
packets.balance:sendToClient(player, {value = 10})
```

#### Aliases

* `send_to_server` / `c2s` → `sendToServer`
* `send_to_client` / `s2c` → `sendToClient`
* `broadcast`, `sendToAll`, `send_to_all` → broadcast

#### Generic `send`

```lua
packets.send("balance", data) -- tries client→server, fallback server→client
```

---

## Receiving

Packets are dispatched by `channel` name. Register in [client events](../../client/general/events.md) or [server events](../../server/events.md) via `LuaEvents` (`neoscripts:lua_packet`).

### `registerPacket(channel, callback)` / aliases

Registers handler for packets arriving on `channel`.

**Aliases:** `registerCustomPacket`, `onPacket`, `registerClientPacket`, `registerServerPacket` — all map to same.

**Unregister:** `unregisterPacket(channel, callback)` (and aliases `unregisterCustomPacket`, `unregisterClientPacket`, `unregisterServerPacket`).

#### Client side (server → client)

Callback receives **data** only (decoded JSON → Lua value). Wildcard `"*"` receives `(channel, data)`.

```lua
-- client script: config/neoscripts/scripts/...
local packets = require("packets")

registerPacket("balance", function(data)
    print("balance from server:", data)
    -- data may be number or table depending on sender
    if type(data) == "table" then
        print(data.value)
    end
end)

-- wildcard: listen all channels
registerPacket("*", function(channel, data)
    print("packet", channel, data)
end)
```

Client handler is fired on client main thread via `ClientPlayNetworking.registerGlobalReceiver` in `client/features/modules/impl/misc/LuaEvents.kt`.

#### Server side (client → server)

Callback receives `(player, data)`. Wildcard `"*"` receives `(player, channel, data)`.

```lua
-- server script: <world>/neoscripts/scripts/...
local packets = require("packets")

registerPacket("balance", function(player, data)
    print("client", player.name, "requested balance, payload:", data)
    -- reply only to sender
    packets.sendToClient(player, "balance", {value = 12345})
end)

-- wildcard
registerPacket("*", function(player, channel, data)
    print("packet from", player.name, channel, data)
end)
```

Server handler is fired on server thread via `ServerPlayNetworking.registerGlobalReceiver` in `server/features/modules/misc/LuaEvents.kt` (`context.server().execute`).

---

## Serialization

Lua → JSON → Lua conversion uses `ServerMain.GSON_COMPACT` (same as `json` lib).

* `nil` → `null` (decoded as `nil` on other side)
* `number` → JSON number (integers preserved if `floor`)
* `string`/`boolean` → unchanged
* `table` with sequential `1..n` integer keys → JSON array
* `table` with other keys → JSON object (keys stringified)
* nested tables supported

```lua
packets.sendToServer("test", {a = 1, b = {2,3}, c = "hi"})
-- decoded as same table on other side
```

Raw string JSON fallback: if payload is empty/invalid, receiver gets original JSON string or `nil`.

---

## Complete Example

**Server** (`<world>/neoscripts/scripts/balance.lua`):
```lua
local packets = require("packets")

registerPacket("balance", function(player, data)
    print("[server] balance request from", player.name, "data:", data)
    -- data may be 10 or {10}
    local bal = 98765
    packets.sendToClient(player, "balance", {value = bal})
end)
```

**Client** (`config/neoscripts/scripts/balance_client.lua`):
```lua
local packets = require("packets")

registerPacket("balance", function(data)
    print("[client] balance reply:", data.value)
end)

-- usage on tick / command / key
registerClientTick(function()
    -- not every tick in real code, just example
end)

-- or via command
registerCommand("reqbalance", function(name, args)
    packets.sendToServer("balance", 10)
    -- or packets.balance:sendToServer(10)
    -- or packets.sendToServer("balance", {10})
end)
```

**Client → server with table payload:**
```lua
packets.sendToServer("balance", {10})
-- server receives: data = { [1]=10 }  (array) or 10 depending on what you sent
```

---

## Implementation Notes

* Payload: `common/network/NeoLuaPacketPayload.kt` — `Identifier("neoscripts:lua_packet")`, `StreamCodec<RegistryFriendlyByteBuf, NeoLuaPacketPayload>` (two `STRING_UTF8` fields: `channel` + `json`).
* Registration: `PayloadTypeRegistry.clientboundPlay()` + `serverboundPlay()` + receivers in `LuaEvents.init()` (both sides, guarded with `try/catch` for singleplayer double-registration).
* Dispatch: `LuaClientScript.onCustomPacket(channel, json)` and `LuaServerScript.onCustomPacket(channel, json, player)` → `PacketsLib.jsonToLua`.
* Library: `common/features/lua/objects/misc/PacketsLib.kt` — exposes `packets` via `require("packets")` in both `LuaClientScript.getSystemModule` and `LuaServerScript.getSystemModule`.
* Threads: client receiver runs via `context.client().execute`, server via `context.server().execute`.

---

## See Also

* [Client Events](../../client/general/events.md#registerpacket-channel-function)
* [Server Events](../../server/events.md#registerpacket-channel-function)
* [Json lib](./json.md)
* Fabric Networking docs: https://docs.fabricmc.net/develop/networking
