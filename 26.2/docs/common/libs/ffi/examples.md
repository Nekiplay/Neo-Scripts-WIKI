# Examples

## Working with structures

```cpp
#include <iostream>
#include <cstring>

struct Player {
    int id;
    float health;
    char name[32];
};

extern "C" {
    // Функция заполняет структуру данными
    void init_player(Player* p, int id, float hp, const char* name) {
        if (!p) return;
        p->id = id;
        p->health = hp;
        
        strncpy(p->name, name, 31);
        p->name[31] = '\0';
    }

    void print_player(Player* p) {
        if (p) {
            std::cout << "[C++] Player: " << p->name << " | ID: " << p->id << " | HP: " << p->health << std::endl;
        }
    }
}

```

```lua
local ffi = require("ffi")

ffi.cdef([[
    struct Player
    {
        int id;
        float health;
        char name[32];
    }]])

local my_lib = ffi.load("test.dll")

local player = ffi.new("Player")

my_lib.init_player(player, 777, 100.0, "NekiPlay_User")

ffi.copy(player.name, "New_Nickname")

local name_from_c = ffi.string(player.name)
print("[Lua] Имя игрока из памяти: " .. name_from_c)

my_lib.print_player(player)

player.health = 50.5
print(string.format("[Lua] ID: %d, HP: %.1f", player.id, player.health))

```

## Callbacks

```cpp
#include <iostream>

typedef int (*MyCallback)(int, const char*);

extern "C" {
    void run_event_loop(int count, MyCallback callback) {
        std::cout << "[C++] Запуск цикла событий..." << std::endl;

        for (int i = 1; i <= count; ++i) {
            char buffer[32];
            snprintf(buffer, sizeof(buffer), "Событие №%d", i);

            // Вызываем колбэк из C++
            std::cout << "[C++] Вызываю колбэк с i=" << i << std::endl;
            int response = callback(i, buffer);

            std::cout << "[C++] Lua ответила: " << response << std::endl;
        }

        std::cout << "[C++] Цикл завершен." << std::endl;
    }
}
```

```lua
local ffi = require("ffi")

local lib = ffi.load("test.dll")

local function my_event_handler(event_id, event_name_ptr)
    local name = ffi.string(event_name_ptr)

    print(string.format("[Lua] Получено: ID=%d, Name='%s'", event_id, name))

    if event_id % 2 == 0 then
        return 1 -- "OK"
    else
        return 0 -- "Skip"
    end
end

local callback_ptr = ffi.callback("int(int, ptr)", my_event_handler)

print("[Lua] Начинаем работу с C++...")
lib.run_event_loop(3, callback_ptr)

print("[Lua] Программа завершена.")

```

## Callback with structure

```cpp
#include <iostream>
#include <cstring>

// Наша структура
struct Entity {
    int id;
    int level;
    float health;
};

typedef void (*EntityProcessor)(Entity*);

extern "C" {
    void process_entity_from_c(EntityProcessor callback) {
        if (!callback) return;

        Entity myEntity;
        myEntity.id = 42;
        myEntity.level = 10;
        myEntity.health = 100.0f;

        std::cout << "[C++] Передаю сущность (ID: " << myEntity.id << ") в Lua..." << std::endl;

        callback(&myEntity);
        
        std::cout << "[C++] После Lua: HP = " << myEntity.health << ", Level = " << myEntity.level << std::endl;
    }
}

```

```lua
local ffi = require("ffi")

ffi.cdef([[
    struct Entity {
        int id;
        int level;
        float health;
    }
]])

local lib = ffi.load("test.dll")

local function my_callback_logic(entity_ptr)
    local entity = ffi.cast("Entity", entity_ptr)

    print("[Lua Callback] Получена сущность:")
    print("    ID: " .. entity.id)
    print("    Level: " .. entity.level)
    print("    HP: " .. entity.health)

    entity.health = entity.health - 25.5
    entity.level = entity.level + 1

    print("[Lua Callback] Данные изменены.")
end

local callback = ffi.callback("void(ptr)", my_callback_logic)

lib.process_entity_from_c(callback)

print("[Lua] Завершено.")

```
