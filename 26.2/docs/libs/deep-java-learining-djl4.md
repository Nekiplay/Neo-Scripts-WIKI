---
description: A library for training and using AI
icon: brain-circuit
---

# Deep Java Learining (djl)

## `create_model(id, model_config)`

**Parameters:**

* `id` (string).
* `model_config` (table).

**Return:**&#x20;

* table

**Example Usage:**

```lua
local djl = require("djl")
local model_config = {
		input_size = 4,
		output_size = 2,
		layers = {16, 8},
		mode = "classification" -- or regression
}
local model_info = djl.create_model("custom_net1", model_config)
```


## `train(id, train_config, train_data, test_data)`

**Parameters:**

* `id` (string).
* `train_config` (table).
* `train_data` (table)
* `test_data` (table)

**Return:**&#x20;

* boolean

**Example Usage:**

```lua
local djl = require("djl")
local train_data = {
		inputs = {
			{0, 0, 0, 0},
			{0, 0, 0, 1},
			{0, 1, 0, 0},
			{1, 1, 1, 1},
			{1, 0, 1, 1},
			{0, 1, 1, 1},
			{0, 0, 0, 0},
			{1, 1, 0, 1} 
		},
		labels = { 0, 0, 0, 1, 1, 1, 0, 1 }
}
local train_config = {
		epochs = 200,
		lr = 0.01,
		batch_size = 2,
		output_size = 2
}
local function onEpoch(epoch)
		print("Epoch: " .. epoch)
end
local success = djl.train("custom_net1", train_config, train_data, onEpoch)
```


## `save_model(id, path)`

**Parameters:**

* `id` (string).
* `path` (string)

**Return:**&#x20;

* boolean

**Example Usage:**

```lua
local djl = require("djl")
djl.save_model("custom_net1", "models/custom_net")
```


## `load_model(id, path, model_config)`

**Parameters:**

* `id` (string).
* `path` (string)
* `model_config` (table)

**Return:**&#x20;

* boolean

**Example Usage:**

```lua
local djl = require("djl")
local model_config = {
		input_size = 4,
		output_size = 2,
		layers = {16, 8},
		mode = "classification" -- or regression
}
local success = djl.load_model("custom_net1", "models/custom_net", model_config)
```


## `predict(id, data)`

**Parameters:**

* `id` (string).
* `data` (table)

**Return:**&#x20;

* boolean

**Example Usage:**

```lua
local djl = require("djl")
local test = {1,0,0,0}
local pred = djl.predict("custom_net1", test)
```


## `close(id)`

**Parameters:**

* `id` (string).

**Return:**&#x20;

* boolean

**Example Usage:**

```lua
local djl = require("djl")
djl.close("custom_net1")
```

