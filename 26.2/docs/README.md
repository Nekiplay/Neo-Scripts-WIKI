# Home
Welcome to the **Neo Scripts** LuaAPI wiki!

Lua version: 5.3

Currently wiki only for default branch

Directory for client-side scripts `<game dir>\config\neoscripts\scripts\`

Directory for common-side scripts `<game/server dir>\neoscripts\autoload\` -- use for addeding custom items from `require("content")`

Directory for server-side scripts `<world dir>\neoscripts\scripts\`

Names of scripts that are automatically loaded when the game starts: **autoload.lua**, **init.lua**

Example multiple autoloading scripts:

1. Create `autoload.lua`
2. Create autoload folder in `config/neoscripts/scripts`
3. Put script file in autload folder
4. Put in autoload.lua `require("autoload/script_name")`
5. Put in autoload.lua `require("autoload/another_script_name")`