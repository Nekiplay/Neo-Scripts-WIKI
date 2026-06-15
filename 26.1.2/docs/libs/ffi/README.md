---
description: Foreign Function Interface - call C libraries from Lua
icon: code
---

# FFI

The FFI (Foreign Function Interface) library allows calling C functions from Lua, working with C data structures, and loading native libraries.

```lua
local ffi = require("ffi")
```

## Registered Types

The following types are available in the type registry:

**Basic types:** `int`, `uint32_t`, `int32_t`, `long`, `int64_t`, `uint64_t`, `size_t`, `float`, `double`, `char`, `bool`, `void`, `ptr`, `uintptr_t`

**Struct types:** Defined via `ffi.cdef` string syntax with named structs

> ⚠ **Important:** Pointer types like `int*`, `char*`, `Point*`, `Entity*` are **NOT** in the type registry. Only the base type `"ptr"` is available for generic pointer casting. Always use `"ptr"` for casts — not `"int*"`, `"char*"`, etc.

---

## Functions

### `ffi.cdef(def)`

Define C structs, function signatures, and enums.

**String syntax** (recommended for structs and functions):

```lua
-- Named structs (not typedef!)
ffi.cdef([[
    struct Point { int x; int y; };
    struct Entity { int id; float health; char name[32]; bool is_alive; };
]])

-- Function signatures (for use with loaded libraries)
ffi.cdef([[
    void* malloc(size_t size);
    void free(void* ptr);
]])
```

> ⚠ **`typedef struct { ... } Name;`** does NOT work — it registers `Name` as a pointer type, not a struct. Always use **named structs**: `struct Name { ... };`

> ⚠ **Enums** via cdef string are NOT supported by this FFI implementation. Use numeric constants directly.

> ⚠ **Nested struct fields** like `struct Point origin;` are NOT supported in field definitions.

**Table syntax** (for structs with packed/union options):

```lua
-- Note: `name` goes INSIDE the config table, first arg is nil
ffi.cdef(nil, {
    name = "MyStruct",
    layout = {
        {"x", "int"},
        {"y", "int"}
    },
    packed = false,
    union = false
})
```

---

### `ffi.load(name)`

Load a native shared library.

**Parameters:**
* `name` (string) — library name (e.g., `"c"`, `"mylib"`).

**Returns:** library object whose methods are called by name.

```lua
local mylib = ffi.load("mylib")
local result = mylib.myFunction(42)
```

---

### `ffi.new(type, count)`

Allocate memory for a C type.

**Parameters:**
* `type` (string) — registered type name.
* `count` (number, optional) — array element count.

**Returns:** cdata object

```lua
-- Single struct
local point = ffi.new("Point")
point.x = 10
point.y = 20

-- Array of structs (access via pointer arithmetic +, NOT via [index])
local base = ffi.new("Point", 3)
base.x = 1; base.y = 2             -- first element
(base + 1).x = 3; (base + 1).y = 4  -- second element (pointer arithmetic)
(base + 2).x = 5; (base + 2).y = 6  -- third element
```

> ⚠ **Array indexing** `arr[0]` for reading values from primitive-type arrays (like `ffi.new("int", 10)`) returns CData objects instead of raw numbers due to a limitation in how JNA's `Memory.getPointer()` interacts with the CData getter. You can **set** values via `arr[0] = 42`, but **reading** `arr[0]` gives CData, not a number. For struct arrays, use pointer arithmetic `(base + N)` which preserves the struct type and allows field access.

---

### `ffi.cast(type, ptr)`

Cast a pointer to a different type.

**Parameters:**
* `type` (string) — must be one of the registered types (basic types or struct types). Only `"ptr"` is available as a generic pointer type. Do **NOT** use `"int*"`, `"char*"`, `"Point*"` — these are not in the registry.
* `ptr` (cdata) — pointer to cast.

**Returns:** cdata object

```lua
-- Cast to generic pointer (always works)
local genericPtr = ffi.cast("ptr", myStruct)

-- Cast back (also works)
local backToStruct = ffi.cast("ptr", genericPtr)
```

> ⚠ Only `"ptr"` works as a cast target type. Pointer-to-struct types like `"Point*"`, `"Entity*"` are NOT in the type registry.

---

### `ffi.sizeof(type)`

Get the size of a C type in bytes.

**Parameters:**
* `type` (string, ctype, or cdata).

**Returns:** number

```lua
print(ffi.sizeof("int"))     -- 4
print(ffi.sizeof("Point"))   -- 0 (not a type)
print(ffi.sizeof("ptr"))     -- 8 (on 64-bit)
```

---

### `ffi.string(ptr, len)`

Convert C memory to a Lua string.

**Parameters:**
* `ptr` (cdata) — pointer or buffer.
* `len` (number, optional) — explicit length (omit for null-terminated).

**Returns:** string

```lua
-- Null-terminated string
local buf = ffi.new("char", 64)
ffi.copy(buf, "Hello from C!")
print(ffi.string(buf))     -- "Hello from C!"

-- Explicit length
print(ffi.string(buf, 5))  -- "Hello"

-- String from struct field
local ent = ffi.new("Entity")
ffi.copy(ent.name, "PlayerOne")
print(ffi.string(ent.name))  -- "PlayerOne"
```

---

### `ffi.copy(dest, src, len)`

Copy memory between cdata objects, or from a Lua string to cdata.

**Parameters:**
* `dest` (cdata) — destination.
* `src` (cdata or string) — source.
* `len` (number, optional) — bytes to copy (defaults to source string length for strings, 1024 for cdata).

```lua
-- Struct copy
local src = ffi.new("Point"); src.x = 42; src.y = 99
local dst = ffi.new("Point")
ffi.copy(dst, src, ffi.sizeof("Point"))

-- String into buffer
local buf = ffi.new("char", 16)
ffi.copy(buf, "TEST_DATA")
```

---

### `ffi.fill(dest, len, value)`

Fill memory with a byte value.

**Parameters:**
* `dest` (cdata) — destination.
* `len` (number) — bytes to fill.
* `value` (number, optional) — byte value (0–255, default 0).

```lua
local buf = ffi.new("char", 16)
ffi.fill(buf, 16, 0x41)  -- fill with 'A'
print(ffi.string(buf, 10))
```

---

### `ffi.callback(prototype, function)`

Create a C-callable callback from a Lua function.

**Parameters:**
* `prototype` (string) — C function signature (e.g., `"int(int, ptr)"`).
* `function` (function) — Lua function to wrap.

**Returns:** cdata (callback pointer), passable to native functions.

```lua
local cb = ffi.callback("void(int, ptr)", function(eventId, namePtr)
    local name = ffi.string(namePtr)
    print("Event:", eventId, name)
end)

-- Pass to native library:
-- mylib.register_event_handler(cb)
```

Supported callback arities: 0–4 arguments. Return types and argument types are matched to C primitives by the JNA callback system.

---

### `ffi.gc(cdata, finalizer)`

Set a garbage collection finalizer for a cdata object.

**Parameters:**
* `cdata` (cdata) — object to finalize.
* `finalizer` (function or nil) — called when GC collects the object. Pass `nil` to remove finalizer.

```lua
local managed = ffi.new("Point")
managed.x = 777
ffi.gc(managed, function(ptr)
    print("Cleaning up Point(", ptr.x, ptr.y, ")")
end)
```

---

### `ffi.typeof(type)`

Get a ctype descriptor object.

**Parameters:**
* `type` (string or cdata).

**Returns:** ctype with fields: `name`, `size`, `alignment`.

```lua
local t = ffi.typeof("int")
print(t.name, t.size, t.alignment)  -- "int", 4, 4
```

---

### `ffi.metatype(type, metatable)`

Attach a Lua metatable to all objects of a given ctype.

**Parameters:**
* `type` (string or ctype) — the ctype name.
* `metatable` (table) — Lua metatable (supports `__tostring` etc.).

**Returns:** string (type name)

```lua
local mt = {
    __tostring = function(self)
        return string.format("Point(%d, %d)", self.x, self.y)
    end
}
ffi.metatype("Point", mt)

local p = ffi.new("Point"); p.x = 5; p.y = 15
print(tostring(p))  -- "Point(5, 15)"
```

---

### `ffi.os`

Platform identifier string.

**Returns:** `"Windows"`, `"Linux"`, `"OSX"`, or `"BSD"`

```lua
print(ffi.os)  -- e.g., "Linux"
```

---

### `ffi.C`

Access to the standard C library (libc).

```lua
local alloc = ffi.C.malloc(1024)
-- ... use alloc ...
ffi.C.free(alloc)
```

---

## Complete Examples

### Working with Structures

```lua
local ffi = require("ffi")

-- Define structs with named struct syntax (NOT typedef)
ffi.cdef([[
    struct Point { int x; int y; };
    struct Entity { int id; float health; char name[32]; bool is_alive; };
]])

-- Create and access structs
local p = ffi.new("Point")
p.x = 10; p.y = 20
print("Point:", p.x, p.y)

-- Struct arrays via pointer arithmetic
local arr = ffi.new("Point", 3)
arr.x = 1; arr.y = 2
(arr + 1).x = 3; (arr + 1).y = 4
(arr + 2).x = 5; (arr + 2).y = 6
print("Element 2:", (arr + 2).x, (arr + 2).y)

-- Struct copy
local dst = ffi.new("Point")
ffi.copy(dst, arr, ffi.sizeof("Point"))

-- String fields
local ent = ffi.new("Entity")
ffi.copy(ent.name, "PlayerOne")
print("Name:", ffi.string(ent.name))
```

### Working with Callbacks

```lua
local ffi = require("ffi")
local lib = ffi.load("test.dll")

local function eventHandler(id, namePtr)
    local name = ffi.string(namePtr)
    print("Event:", id, name)
    return 0
end

local cb = ffi.callback("int(int, ptr)", eventHandler)
-- Pass 'cb' to a native function expecting a callback
```

### Working with Memory

```lua
local ffi = require("ffi")

-- Allocate and fill
local buf = ffi.new("char", 64)
ffi.copy(buf, "Hello FFI!")
ffi.fill(buf + 10, 6, 0x41)  -- fill bytes 10-16 with 'A'

-- Read as string
local text = ffi.string(buf)

-- Generic pointer casting (use "ptr", not "char*"!)
local ptr = ffi.cast("ptr", buf)
```

### Metatypes for Custom Behavior

```lua
local ffi = require("ffi")

ffi.cdef([[ struct Vec2 { float x; float y; }; ]])

ffi.metatype("Vec2", {
    __add = function(a, b)
        return ffi.new("Vec2")  -- custom addition
    end,
    __tostring = function(self)
        return string.format("(%.1f, %.1f)", self.x, self.y)
    end
})

local v = ffi.new("Vec2"); v.x = 1.5; v.y = 2.5
print(tostring(v))  -- "(1.5, 2.5)"
```

## Known Limitations

| Feature | Status | Workaround |
|---------|--------|------------|
| `typedef struct { ... } Name;` | ❌ Registers `Name` as pointer type | Use `struct Name { ... };` |
| Pointer types (`int*`, `char*`, `Point*`) | ❌ Not in type registry | Cast with `"ptr"` only |
| Enum parsing in cdef strings | ❌ Not implemented | Use numeric constants |
| Nested struct fields (`struct X field;`) | ❌ Not supported | Flatten into top-level fields |
| Array read `arr[0]` on primitive arrays | ❌ Returns CData not number | Use `ffi.new` for individual values; use pointer arithmetic for structs |
| Function typedefs | ❌ Not handled | Define function signatures directly without typedef |
| `ffi.C` (libc) | ✅ Works | Memory functions may need manual management |
