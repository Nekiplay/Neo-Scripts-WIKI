---
description: Bytes to string, string to bytes and encoding utilities
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
* `encoding` (string, optional) - default "UTF-8".

**Return:** 
* bytes (table), err

**Example Usage:**
```lua
local encoding = require("encoding")
local bytes, err = encoding.stringToBytes("Hello, мир!", "UTF-8")
if bytes then
    print("Bytes:", table.concat({table.unpack(bytes)}, ", "))
end
```

## `bytesToString(bytes, encoding)`

**Parameters:**
* `bytes` (table).
* `encoding` (string, optional) - default "UTF-8".

**Return:** 
* string, err

**Example Usage:**
```lua
local decoded, err = encoding.bytesToString(bytes, "UTF-8")
if decoded then
    print("Decoded:", decoded)
end
```

## `getSupportedEncodings()`

Returns a list of all supported encoding names.

**Return:** 
* table

**Example Usage:**
```lua
local encodings = encoding.getSupportedEncodings()
for i, name in ipairs(encodings) do
    print(name)
end
```

## `isValidEncoding(name)`

Check if an encoding is supported.

**Parameters:**
* `name` (string).

**Return:** 
* boolean

**Example Usage:**
```lua
print(encoding.isValidEncoding("UTF-8")) -- true
print(encoding.isValidEncoding("UNKNOWN")) -- false
```

## `detectEncoding(text)`

Try to detect the encoding of a text string.

**Parameters:**
* `text` (string).

**Return:** 
* string (encoding name) or nil

**Example Usage:**
```lua
local enc = encoding.detectEncoding(someText)
print("Detected encoding:", enc)
```

## `convertEncoding(text, fromEncoding, toEncoding)`

Convert text between encodings.

**Parameters:**
* `text` (string).
* `fromEncoding` (string).
* `toEncoding` (string).

**Return:** 
* string, err

**Example Usage:**
```lua
local converted, err = encoding.convertEncoding(text, "CP1251", "UTF-8")
```

## `hexEncode(text)`

Encode text to hexadecimal string.

**Parameters:**
* `text` (string).

**Return:** 
* string

**Example Usage:**
```lua
local hex = encoding.hexEncode("Hello")
print(hex) -- "48656c6c6f"
```

## `hexDecode(hex)`

Decode hexadecimal string to text.

**Parameters:**
* `hex` (string).

**Return:** 
* string, err

**Example Usage:**
```lua
local text, err = encoding.hexDecode("48656c6c6f")
print(text) -- "Hello"
```

## `base64Encode(text)`

Encode text to Base64.

**Parameters:**
* `text` (string).

**Return:** 
* string

**Example Usage:**
```lua
local b64 = encoding.base64Encode("Hello World!")
```

## `base64Decode(base64)`

Decode Base64 string to text.

**Parameters:**
* `base64` (string).

**Return:** 
* string, err

**Example Usage:**
```lua
local text, err = encoding.base64Decode("SGVsbG8gV29ybGQh")
```
