---
icon: square-binary
---

# Cat Boost Model

## `predict(features, labels)`

Predict

**Parameters:**

* `features` (list float).
* `labels` (list string).

**Return:**&#x20;

* [predictions](cat-boost-predictions.md)

**Example Usage:**

<pre class="language-lua"><code class="lang-lua">-- Example code showing how to use the function
local model = catboost.loadModel("model.cbm")
<strong>local predictions = model.predict({0, 1}, {"Apple", "Banana"})
</strong></code></pre>
