import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'ru-RU',
  title: 'Neo Scritpts Lua API',
  description: 'Wiki for the Neo Scripts mod',

  // 1. Важно: базовый URL-путь. Должен совпадать с названием папки в htdocs.
  // Обязательно должен начинаться и заканчиваться косой чертой (/).
  base: '/wiki/26.1.2/',

  // Добавляем подключение Font Awesome в тег <head>
  head: [
    [
      'link', 
      { 
        rel: 'stylesheet', 
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css' 
      }
    ]
  ],
  
  theme: defaultTheme({
    // Ручная настройка структуры бокового меню
    sidebar: [
      {
        text: 'General',
        children: [
          { text: "⚙️ General", link: "/general/general.html" },
          { text: "🔔 Events", link: "/general/events.html" },
          { text: "🪟 Window", link: "/general/window.html" },
        ],
      },
      {
        text: 'Libs',
        children: [
          {
            text: 'FFI',
			collapsible: true,
			children: [ 
				{
					text: 'Examples',
					link: '/libs/ffi/examples.html' 
				}
			]
          },
          { text: "📄 Encoding", link: "/libs/encoding.html" },
          { text: "✏️ Text Builder", link: "/libs/text-builder.html" },
          { text: "➕ Creator", link: "/libs/creator.html" },
          { text: "🎥 Camera", link: "/libs/camera.html" },
          { text: "🌐 Http", link: "/libs/http.html" },
          { text: "🌐 TCP", link: "/libs/tcp.html" },
          { text: "📄 Json", link: "/libs/json.html" },
          { text: "📦 Archive", link: "/libs/archive.html" },
          { text: "🧱 Blocks Registry", link: "/libs/blocks.html" },
          { text: "🪣 Items Registry", link: "/libs/items.html" },
          { text: "👥 Entities Registry", link: "/libs/entities.html" },
          { text: "🧵 Threads", link: "/libs/threads.html" },
          { text: "🗺️ Xaero Minimap", link: "/libs/xaero-minimap.html" },
          {
            text: "🐱 Catboost",
            link: "/libs/catboost/index.html",
            collapsible: true,
            children: [
              {
                text: "Model",
                link: "/libs/catboost/cat-boost-model/index.html",
                collapsible: true,
                children: [
                  {
                    text: "Predictions",
                    link: "/libs/catboost/cat-boost-model/cat-boost-predictions.html",
                  },
                ],
              },
            ],
          },
          {
            text: "🧠 Deep Java Learning (djl)",
            link: "/libs/deep-java-learining-djl4.html",
            collapsible: true,
            children: [
              {
                text: "Examples",
                link: "/libs/deep-java-learining-djl4/examples.html",
              },
            ],
          },
          {
            text: '💻 ImGUI',
			link: '/libs/imgui/index.html',
            collapsible: true,
            children: [
              {
                text: "Constants",
                link: "/libs/imgui/constants.html",
              },
              {
                text: "DrawList",
                link: "/libs/imgui/draw-list.html",
              },
              {
                text: "🔧 Components",
                link: "/libs/imgui/components.html",
                collapsible: true,
                children: [
                  {
                    text: "Window",
                    link: "/libs/imgui/window.html",
                  },
                  {
                    text: "Widgets",
                    link: "/libs/imgui/widgets.html",
                  },
                  {
                    text: "Layout",
                    link: "/libs/imgui/layout.html",
                  },
                  {
                    text: "Tables",
                    link: "/libs/imgui/tables.html",
                  },
                  {
                    text: "Menus & Popups",
                    link: "/libs/imgui/menus.html",
                  },
                  {
                    text: "Styling",
                    link: "/libs/imgui/styling.html",
                  },
                  {
                    text: "State Queries",
                    link: "/libs/imgui/state.html",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'DataTypes',
        children: [
          { text: "📦 Box", link: "/datatypes/box.html" },
          { text: "🗺️ Map", link: "/datatypes/map.html" },
          { text: "⚔️ Item", link: "/datatypes/item.html" },
          { text: "👽 Entity", link: "/datatypes/entity.html" },
          { text: "🧱 Block", link: "/datatypes/block.html" },
          { text: "🧭 Vector3", link: "/datatypes/vector3.html" },
          { text: "🧭 BlockPos", link: "/datatypes/blockPos.html" },
          { text: "🎯 Direction", link: "/datatypes/direction.html" },
          { text: "🧭 Axis", link: "/datatypes/axis.html" },
          { text: "🧭 AxisDirection", link: "/datatypes/axis-direction.html" },
          { text: "📐 Raycast", link: "/datatypes/raycast.html" },
          { text: "📝 Component", link: "/datatypes/component.html" },
        ],
      },
	  {
        text: 'Player Objects',
		link: '/player-objects/player/index.html',
		collapsible: true,
        children: [
          { text: "📖 Player", link: "/player-objects/player/index.html" },
          { text: "⌨️ Input", link: "/player-objects/player/input.html" },
          { text: "🎒 Inventory", link: "/player-objects/player/inventory.html" },
          { text: "🌐 Network", link: "/player-objects/player/network.html" },
        ],
      },
      {
        text: "World",
        link: "/world-objects/world.html",
        children: [
          { text: "Block iterator", link: "/world-objects/block-scanner.html" },
        ],
      },
	  {
        text: 'Rendering Objects',
		collapsible: true,
        children: [
          { text: '2D Rendering', link: '/rendering-objects/2d-renderer.html' },
          { text: '3D Rendering', link: '/rendering-objects/world-renderer.html' },
        ],
      },
    ],
  }),

  // 2. Путь, куда VuePress будет сохранять собранные файлы при сборке.
  // Указываем папку htdocs внутри вашего установленного XAMPP.
  dest: 'C:/xampp/htdocs/wiki/26.1.2',

  bundler: viteBundler(),
})