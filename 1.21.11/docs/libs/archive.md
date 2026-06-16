---
description: Archive compression library supporting zip, tar, and gzip
icon: file-zipper
---

# Archive

## `zip(sourcePath, zipPath, recursive)`

Compresses a file or directory into a zip archive.

Has an issue where there are leftover directories during compression.

**Parameters:**

* `sourcePath` (string) - Path to the file or directory to compress.
* `zipPath` (string) - Path for the output zip file.
* `recursive` (boolean, optional) - If `true`, include subdirectories recursively. Default: `true`.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
local success, err = archive.zip("config/myscripts/", "backup.zip", true)
if success then
    print("Archive created successfully")
else
    print("Error: " .. err)
end
```

## `unzip(zipPath, destPath)`

Extracts a zip archive to a directory.

**Parameters:**

* `zipPath` (string) - Path to the zip file.
* `destPath` (string) - Destination directory for extraction.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
local success, err = archive.unzip("backup.zip", "config/myscripts/")
```

## `extractFile(archivePath, entryName, destPath)`

Extracts a single file from a zip archive.

**Parameters:**

* `archivePath` (string) - Path to the archive.
* `entryName` (string) - Name of the entry to extract.
* `destPath` (string) - Destination file path.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
local success, err = archive.extractFile("backup.zip", "script.lua", "restored_script.lua")
```

## `listEntries(archivePath)`

Lists all entries in an archive.

**Parameters:**

* `archivePath` (string) - Path to the archive (supports .zip, .tar, .tar.gz).

**Returns:**

* (table) List of entry tables, each containing `name`, `size`, and `is_directory` fields.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
local entries = archive.listEntries("backup.zip")
for i, entry in ipairs(entries) do
    print(entry.name .. " (" .. entry.size .. " bytes)")
end
```

## `zipFile(zipPath, filePath, entryName)`

Adds a file to an existing zip archive (or creates a new one).

**Parameters:**

* `zipPath` (string) - Path to the zip file.
* `filePath` (string) - Path to the file to add.
* `entryName` (string, optional) - Name for the entry inside the zip. Defaults to the file name.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
archive.zipFile("backup.zip", "newscript.lua", "scripts/newscript.lua")
```

## `gzip(sourcePath, gzPath)`

Compresses a file using gzip.

**Parameters:**

* `sourcePath` (string) - Path to the source file.
* `gzPath` (string) - Path for the output .gz file.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
archive.gzip("data.bin", "data.bin.gz")
```

## `gunzip(gzPath, destPath)`

Decompresses a gzip file.

**Parameters:**

* `gzPath` (string) - Path to the .gz file.
* `destPath` (string) - Destination file path.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
archive.gunzip("data.bin.gz", "data.bin")
```

## `tar(sourcePath, tarPath, recursive)`

Creates a tar archive from a file or directory.

**Parameters:**

* `sourcePath` (string) - Path to the file or directory.
* `tarPath` (string) - Path for the output tar file.
* `recursive` (boolean, optional) - If `true`, include subdirectories. Default: `true`.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
archive.tar("config/myscripts/", "scripts.tar")
```

## `untar(tarPath, destPath)`

Extracts a tar archive to a directory.

**Parameters:**

* `tarPath` (string) - Path to the tar file.
* `destPath` (string) - Destination directory.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
archive.untar("scripts.tar", "config/myscripts/")
```

## `tarGzip(sourcePath, tarGzPath, recursive)`

Creates a compressed tar.gz archive.

**Parameters:**

* `sourcePath` (string) - Path to the file or directory.
* `tarGzPath` (string) - Path for the output .tar.gz file.
* `recursive` (boolean, optional) - If `true`, include subdirectories. Default: `true`.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
archive.tarGzip("config/myscripts/", "scripts.tar.gz")
```

## `extractTarGz(tarGzPath, destPath)`

Extracts a tar.gz archive to a directory.

**Parameters:**

* `tarGzPath` (string) - Path to the .tar.gz file.
* `destPath` (string) - Destination directory.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
archive.extractTarGz("scripts.tar.gz", "config/myscripts/")
```

## `extractFileFromTar(archivePath, entryName, destPath)`

Extracts a single file from a tar or tar.gz archive.

**Parameters:**

* `archivePath` (string) - Path to the tar/tar.gz archive.
* `entryName` (string) - Name of the entry to extract.
* `destPath` (string) - Destination file path.

**Returns:**

* (boolean, string) `true` on success, or `nil` + error message on failure.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
local success, err = archive.extractFileFromTar("scripts.tar.gz", "script.lua", "restored.lua")
```

## `getSupportedFormats()`

Returns a list of supported archive formats.

**Returns:**

* (table) List of format strings.

**Example Usage:**

```lua
-- Example code showing how to use the function
local archive = require("archive")
local formats = archive.getSupportedFormats()
for i, format in ipairs(formats) do
    print("Supported: " .. format)
end
```
