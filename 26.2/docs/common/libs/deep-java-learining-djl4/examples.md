---
icon: align-left
---

# Examples

## Regression (Math prediction)

```lua
-- 1. Create the model in "regression" mode
local model_id = "math_predictor"
local djl = require("djl")

djl.create_model(model_id, {
    input_size = 1,      -- One input parameter (x)
    output_size = 1,     -- One output parameter (y)
    mode = "regression", -- PREDICTION MODE (Continuous values)
    layers = {16, 16}    -- Two hidden layers with 16 neurons each
})

-- 2. Prepare training data (y = 2x + 10)
local train_data = {
    inputs = {},
    labels = {}
}

-- Generate 50 examples for training
for x = 1, 50 do
    table.insert(train_data.inputs, {x})    -- Input: x (must be a table)
    table.insert(train_data.labels, 2 * x + 10) -- Output: y (actual value)
end

-- 3. Start training
print("Starting training...")

djl.train(model_id, 
    {
        epochs = 200,      -- Number of training iterations
        lr = 0.01,         -- Learning rate
        batch_size = 5,    -- Data batch size
        output_size = 1
    }, 
    train_data, 
    nil -- Test data (skipped for this example)
)

-- 4. Test how well the network learned to "predict"
-- Let's try the number 100. Expected result: 2 * 100 + 10 = 210
local test_x = {100}
local prediction = djl.predict(model_id, test_x)

print("---------------------------------")
print("Input: 100")
print("Expected: 210")
print("Predicted: " .. prediction[1]) -- The result will be a number close to 210
print("---------------------------------")

-- 5. Don't forget to close the model to free up memory
djl.close(model_id)
```
