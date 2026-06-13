---
description: Bytes to string, string to bytes
icon: file-code
---

# Encoding

<details>

<summary>Supported encodings</summary>

1. UTF-8
2. UTF-16
3. UTF-16BE
4. UTF-16LE
5. UTF-32
6. UTF-32BE
7. UTF-32LE
8. ASCII
9. ISO-8859-1
10. CP1251
11. CP1252
12. KOI8-R
13. KOI8-U
14. WINDOWS-1251

</details>

## `stringToBytes(text, encoding)`

**Parameters:**

* `text` (string).
* `encoding` (encoding).

**Return:**&#x20;

* bytes, err

**Example Usage:**

```lua
local encoding = require("encoding")
local text = "Hello, мир!"
local bytes, err = encoding.stringToBytes(text, "UTF-8")
if bytes then
    print("   Текст: " .. text)
    print("   Байты: ", table.concat({table.unpack(bytes)}, ", "))
else
    print("   Ошибка: " .. err)
end
```

## `bytesToString(bytes, encoding)`

**Parameters:**

* `bytes` (table).
* `encoding` (encoding).

**Return:**&#x20;

* string, err

**Example Usage:**

```lua
local encoding = require("encoding")
local decoded, err2 = encoding.bytesToString(bytes, "UTF-8")
if decoded then
    print("   Декодировано: " .. decoded)
    print("   Совпадает с оригиналом: " .. tostring(decoded == text))
else
    print("   Ошибка: " .. err2)
end
```
