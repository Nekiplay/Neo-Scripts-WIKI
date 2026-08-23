---
icon: head-side-gear
---

# Cat Boost Predictions

## `get(onjectIndex, predictionIndex)`

Get result

**Parameters:**

* `path` (string).

**Return:**&#x20;

* number

**Example Usage:**

```lua
-- Example code showing how to use the function
local model = catboost.loadModel("model.cbm")
local predictions = model.predict({0.1, 0.3, 0.2}, {"foo", "bar", "baz"})
local result = predictions.get(0, 0)
```

