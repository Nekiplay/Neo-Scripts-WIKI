import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'
import { iconifyPlugin } from 'vuepress-plugin-iconify'

export default defineUserConfig({
  lang: 'ru-RU',
  title: 'Neo Scritpts Lua API',
  description: 'Wiki for the Neo Scripts mod',

  // 1. Важно: базовый URL-путь. Должен совпадать с названием папки в htdocs.
  // Обязательно должен начинаться и заканчиваться косой чертой (/).
  base: '/wiki/26.2/',

  plugins: [
    searchPlugin({
	  locales: {
        '/': {
          placeholder: 'Search',
        },
        '/ru/': {
          placeholder: 'Поиск',
        },
      },
      isSearchable: (page) => page.path !== '/',
    }),
	shikiPlugin({
      // options
	  theme: 'github-dark',
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff', 'lua'],
    }),
	markdownStylizePlugin({
      // options
    }),
	iconifyPlugin(),
  ],

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
	themePlugins: {
      prismjs: false,
    },
    // Ручная настройка структуры бокового меню
    sidebar: [
      {
        text: 'Common',
        collapsible: true,
        children: [
          {
            text: 'DataTypes',
            collapsible: true,
            children: [
              { text: "📦 Box", link: "/common/datatypes/box.html" },
              { text: "🗺️ Map", link: "/common/datatypes/map.html" },
              { text: "⚔️ Item", link: "/common/datatypes/item.html" },
              { text: "👽 Entity", link: "/common/datatypes/entity.html" },
              { text: "📦 Inventory", link: "/common/datatypes/inventory.html" },
              {
                text: "🧱 Block",
                link: "/common/datatypes/block.html",
                collapsible: true,
                children: [
                  {
                    text: "Properties",
                    link: "/common/datatypes/block_properties.html",
                  }
                ],
              },
              { text: "🧭 Vector3", link: "/common/datatypes/vector3.html" },
              { text: "🧭 BlockPos", link: "/common/datatypes/blockPos.html" },
              { text: "🗃️ Block Entity", link: "/common/datatypes/blockEntity.html" },
              { text: "🎯 Direction", link: "/common/datatypes/direction.html" },
              { text: "🧭 Axis", link: "/common/datatypes/axis.html" },
              { text: "🧭 AxisDirection", link: "/common/datatypes/axis-direction.html" },
              { text: "📐 Raycast", link: "/common/datatypes/raycast.html" },
              { text: "📝 Component", link: "/common/datatypes/component.html" },
            ],
          },
          {
            text: "🧠 Deep Java Learning (djl)",
            link: "/common/libs/deep-java-learining-djl4.html",
            collapsible: true,
            children: [
              {
                text: "Examples",
                link: "/common/libs/deep-java-learining-djl4/examples.html",
              },
            ],
          },
          {
            text: "🐱 Catboost",
            link: "/common/libs/catboost/index.html",
            collapsible: true,
            children: [
              {
                text: "Model",
                link: "/common/libs/catboost/cat-boost-model/index.html",
                collapsible: true,
                children: [
                  {
                    text: "Predictions",
                    link: "/common/libs/catboost/cat-boost-model/cat-boost-predictions.html",
                  },
                ],
              },
            ],
          },
          { text: "🧵 Threads", link: "/common/libs/threads.html" },
          { text: "👥 Entities Registry", link: "/common/libs/entities.html" },
          { text: "🪣 Items Registry", link: "/common/libs/items.html" },
          { text: "🧱 Blocks Registry", link: "/common/libs/blocks.html" },
          { text: "📦 Archive", link: "/common/libs/archive.html" },
          { text: "📄 Json", link: "/common/libs/json.html" },
          { text: "🌐 UDP", link: "/common/libs/udp.html" },
          { text: "🌐 TCP", link: "/common/libs/tcp.html" },
          { text: "🌐 Http", link: "/common/libs/http.html" },
          { text: "➕ Creator", link: "/common/libs/creator.html" },
          { text: "✏️ Text Builder", link: "/common/libs/text-builder.html" },
          { text: "📄 Encoding", link: "/common/libs/encoding.html" },
          {
            text: 'FFI',
            collapsible: true,
            children: [
              {
                text: 'Examples',
                link: '/common/libs/ffi/examples.html'
              }
            ]
          },
        ],
      },
      {
        text: 'Client',
        collapsible: true,
        children: [
          { text: "⚙️ General", link: "/client/general/general.html" },
          { text: "🔔 Events", link: "/client/general/events.html" },
          { text: "🪟 Window", link: "/client/general/window.html" },
          { text: "🎥 Camera", link: "/client/libs/camera.html" },
          {
            text: "🧱 Baritone API", link: "/client/libs/baritone/",
            collapsible: true,
            children: [
              {
                text: "Baritone Settings",
                link: "/client/libs/baritone/settings.html"
              },
              {
                text: "Baritone Pathing Behavior",
                link: "/client/libs/baritone/pathing_behavior.html"
              },
              {
                text: "Baritone Mining Behavior",
                link: "/client/libs/baritone/mining_behavior.html"
              },
            ],
          },
          { text: "🗺️ Xaero Minimap", link: "/client/libs/xaero-minimap.html" },
          {
            text: '💻 ImGUI',
            link: '/client/libs/imgui/index.html',
            collapsible: true,
            children: [
              {
                text: "Constants",
                link: "/client/libs/imgui/constants.html",
              },
              {
                text: "DrawList",
                link: "/client/libs/imgui/draw-list.html",
              },
              {
                text: "🔧 Components",
                link: "/client/libs/imgui/components.html",
                collapsible: true,
                children: [
                  {
                    text: "Window",
                    link: "/client/libs/imgui/window.html",
                  },
                  {
                    text: "Widgets",
                    link: "/client/libs/imgui/widgets.html",
                  },
                  {
                    text: "Layout",
                    link: "/client/libs/imgui/layout.html",
                  },
                  {
                    text: "Tables",
                    link: "/client/libs/imgui/tables.html",
                  },
                  {
                    text: "Menus & Popups",
                    link: "/client/libs/imgui/menus.html",
                  },
                  {
                    text: "Styling",
                    link: "/client/libs/imgui/styling.html",
                  },
                  {
                    text: "State Queries",
                    link: "/client/libs/imgui/state.html",
                  },
                ],
              },
            ],
          },
          {
            text: 'Player Objects',
            link: '/client/player-objects/player/index.html',
            collapsible: true,
            children: [
              { text: "📖 Player", link: "/client/player-objects/player/index.html" },
              { text: "⌨️ Input", link: "/client/player-objects/player/input.html" },
              { text: "🎒 Inventory", link: "/client/player-objects/player/inventory.html" },
              { text: "🌐 Network", link: "/client/player-objects/player/network.html" },
            ],
          },
          {
            text: "World",
            link: "/client/world-objects/world.html",
            children: [
              { text: "Block iterator", link: "/client/world-objects/block-scanner.html" },
            ],
          },
          {
            text: 'Rendering Objects',
            collapsible: true,
            children: [
              { text: '2D Rendering', link: '/client/rendering-objects/2d-renderer.html' },
              { text: '3D Rendering', link: '/client/rendering-objects/world-renderer.html' },
            ],
          },
        ],
      },
      {
        text: 'Server',
        collapsible: true,
        children: [
          { text: "🖥️ General", link: "/server/general.html" },
          { text: "🔔 Events", link: "/server/events.html" },
          { text: "🌐 Server", link: "/server/server.html" },
          { text: "🌍 World", link: "/server/world.html" },
        ],
      },
    ],
  }),

  // 2. Путь, куда VuePress будет сохранять собранные файлы при сборке.
  // Указываем папку htdocs внутри вашего установленного XAMPP.
  dest: 'C:/xampp/htdocs/wiki/26.2',

  bundler: viteBundler(),
})
