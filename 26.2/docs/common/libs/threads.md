---
description: Thread management library
icon: arrow-split
---

# Threads

## `startThread(function)`

Starts a new thread running the given function.

**Parameters:**

* `function` (function) - The function to execute in a new thread.

**Returns:**

* (number) Thread ID.

**Example Usage:**

```lua
-- Example code showing how to use the function
local threads = require("threads")
local threadId = threads.startThread(function()
    threads.sleep(1000)
    print("Thread finished!")
end)
print("Started thread: " .. threadId)
```

## `joinThread(id)`

Waits for a thread to finish execution.

**Parameters:**

* `id` (number) - The thread ID.

**Example Usage:**

```lua
-- Example code showing how to use the function
local threads = require("threads")
local threadId = threads.startThread(function()
    threads.sleep(500)
end)
threads.joinThread(threadId)
print("Thread completed")
```

## `isAlive(id)`

Checks if a thread is still running.

**Parameters:**

* `id` (number) - The thread ID.

**Returns:**

* (boolean) `true` if the thread is alive.

**Example Usage:**

```lua
-- Example code showing how to use the function
local threads = require("threads")
local threadId = threads.startThread(function()
    threads.sleep(1000)
end)
if threads.isAlive(threadId) then
    print("Thread is still running")
end
```

## `interruptThread(id)`

Interrupts a running thread.

**Parameters:**

* `id` (number) - The thread ID.

**Returns:**

* (boolean) `true` if successfully interrupted.

**Example Usage:**

```lua
-- Example code showing how to use the function
local threads = require("threads")
local threadId = threads.startThread(function()
    while true do
        threads.sleep(100)
    end
end)
threads.interruptThread(threadId)
```

## `stopThread(id)`

Stops a thread immediately.

**Parameters:**

* `id` (number) - The thread ID.

**Returns:**

* (boolean) `true` if successfully stopped.

**Example Usage:**

```lua
-- Example code showing how to use the function
local threads = require("threads")
local threadId = threads.startThread(function()
    while true do
        threads.sleep(100)
    end
end)
threads.stopThread(threadId)
```

## `sleep(ms)`

Puts the current thread to sleep for a specified duration.

**Parameters:**

* `ms` (number) - Sleep duration in milliseconds.

**Example Usage:**

```lua
-- Example code showing how to use the function
local threads = require("threads")
print("Waiting...")
threads.sleep(2000)
print("Done waiting!")
```

## `getThreadCount()`

Returns the number of active threads.

**Returns:**

* (number) Active thread count.

**Example Usage:**

```lua
-- Example code showing how to use the function
local threads = require("threads")
print("Active threads: " .. threads.getThreadCount())
```
