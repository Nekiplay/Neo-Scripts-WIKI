// 1.21.11/docs/.vuepress/config.js
import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { viteBundler } from "@vuepress/bundler-vite";
import { searchPlugin } from "@vuepress/plugin-search";
import { shikiPlugin } from "@vuepress/plugin-shiki";
var config_default = defineUserConfig({
  lang: "ru-RU",
  title: "Neo Scritpts Lua API",
  description: "Wiki for the Neo Scripts mod",
  // 1. Важно: базовый URL-путь. Должен совпадать с названием папки в htdocs.
  // Обязательно должен начинаться и заканчиваться косой чертой (/).
  base: "/wiki/1.21.11/",
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "Search"
        },
        "/ru/": {
          placeholder: "\u041F\u043E\u0438\u0441\u043A"
        }
      },
      isSearchable: (page) => page.path !== "/"
    }),
    shikiPlugin({
      // options
      theme: "github-dark",
      langs: ["ts", "json", "vue", "md", "bash", "diff", "lua"]
    })
  ],
  // Добавляем подключение Font Awesome в тег <head>
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      }
    ]
  ],
  theme: defaultTheme({
    themePlugins: {
      prismjs: false
    },
    // Ручная настройка структуры бокового меню
    sidebar: [
      {
        text: "General",
        children: [
          { text: "\u2699\uFE0F General", link: "/general/general.html" },
          { text: "\u{1F514} Events", link: "/general/events.html" },
          { text: "\u{1FA9F} Window", link: "/general/window.html" }
        ]
      },
      {
        text: "Libs",
        children: [
          {
            text: "FFI",
            collapsible: true,
            children: [
              {
                text: "Examples",
                link: "/libs/ffi/examples.html"
              }
            ]
          },
          { text: "\u{1F4C4} Encoding", link: "/libs/encoding.html" },
          { text: "\u270F\uFE0F Text Builder", link: "/libs/text-builder.html" },
          { text: "\u2795 Creator", link: "/libs/creator.html" },
          { text: "\u{1F310} Http", link: "/libs/http.html" },
          { text: "\u{1F310} TCP", link: "/libs/tcp.html" },
          { text: "\u{1F4C4} Json", link: "/libs/json.html" },
          { text: "\u{1F4E6} Archive", link: "/libs/archive.html" },
          { text: "\u{1F9F1} Blocks Registry", link: "/libs/blocks.html" },
          { text: "\u{1FAA3} Items Registry", link: "/libs/items.html" },
          { text: "\u{1F465} Entities Registry", link: "/libs/entities.html" },
          { text: "\u{1F9F5} Threads", link: "/libs/threads.html" },
          { text: "\u{1F5FA}\uFE0F Xaero Minimap", link: "/libs/xaero-minimap.html" },
          {
            text: "\u{1F431} Catboost",
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
                    link: "/libs/catboost/cat-boost-model/cat-boost-predictions.html"
                  }
                ]
              }
            ]
          },
          {
            text: "\u{1F9E0} Deep Java Learning (djl)",
            link: "/libs/deep-java-learining-djl4.html",
            collapsible: true,
            children: [
              {
                text: "Examples",
                link: "/libs/deep-java-learining-djl4/examples.html"
              }
            ]
          },
          {
            text: "\u{1F4BB} ImGUI",
            link: "/libs/imgui/index.html",
            collapsible: true,
            children: [
              {
                text: "Constants",
                link: "/libs/imgui/constants.html"
              },
              {
                text: "DrawList",
                link: "/libs/imgui/draw-list.html"
              },
              {
                text: "\u{1F527} Components",
                link: "/libs/imgui/components.html",
                collapsible: true,
                children: [
                  {
                    text: "Window",
                    link: "/libs/imgui/window.html"
                  },
                  {
                    text: "Widgets",
                    link: "/libs/imgui/widgets.html"
                  },
                  {
                    text: "Layout",
                    link: "/libs/imgui/layout.html"
                  },
                  {
                    text: "Tables",
                    link: "/libs/imgui/tables.html"
                  },
                  {
                    text: "Menus & Popups",
                    link: "/libs/imgui/menus.html"
                  },
                  {
                    text: "Styling",
                    link: "/libs/imgui/styling.html"
                  },
                  {
                    text: "State Queries",
                    link: "/libs/imgui/state.html"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "DataTypes",
        children: [
          { text: "\u{1F4E6} Box", link: "/datatypes/box.html" },
          { text: "\u{1F5FA}\uFE0F Map", link: "/datatypes/map.html" },
          { text: "\u2694\uFE0F Item", link: "/datatypes/item.html" },
          { text: "\u{1F47D} Entity", link: "/datatypes/entity.html" },
          { text: "\u{1F9F1} Block", link: "/datatypes/block.html" },
          { text: "\u{1F9ED} Vector3", link: "/datatypes/vector3.html" },
          { text: "\u{1F9ED} BlockPos", link: "/datatypes/blockPos.html" },
          { text: "\u{1F3AF} Direction", link: "/datatypes/direction.html" },
          { text: "\u{1F9ED} Axis", link: "/datatypes/axis.html" },
          { text: "\u{1F9ED} AxisDirection", link: "/datatypes/axis-direction.html" },
          { text: "\u{1F4D0} Raycast", link: "/datatypes/raycast.html" },
          { text: "\u{1F4DD} Component", link: "/datatypes/component.html" }
        ]
      },
      {
        text: "Player Objects",
        link: "/player-objects/player/index.html",
        collapsible: true,
        children: [
          { text: "\u{1F4D6} Player", link: "/player-objects/player/index.html" },
          { text: "\u2328\uFE0F Input", link: "/player-objects/player/input.html" },
          { text: "\u{1F392} Inventory", link: "/player-objects/player/inventory.html" },
          { text: "\u{1F310} Network", link: "/player-objects/player/network.html" }
        ]
      },
      {
        text: "World",
        link: "/world-objects/world.html",
        children: [
          { text: "Block iterator", link: "/world-objects/block-scanner.html" }
        ]
      },
      {
        text: "Rendering Objects",
        collapsible: true,
        children: [
          { text: "2D Rendering", link: "/rendering-objects/2d-renderer.html" },
          { text: "3D Rendering", link: "/rendering-objects/world-renderer.html" }
        ]
      }
    ]
  }),
  // 2. Путь, куда VuePress будет сохранять собранные файлы при сборке.
  // Указываем папку htdocs внутри вашего установленного XAMPP.
  dest: "C:/xampp/htdocs/wiki/1.21.11",
  bundler: viteBundler()
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiMS4yMS4xMS9kb2NzLy52dWVwcmVzcy9jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi93aWtpLzEuMjEuMTEvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdpa2lcXFxcMS4yMS4xMVxcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxjb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3dpa2kvMS4yMS4xMS9kb2NzLy52dWVwcmVzcy9jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSAndnVlcHJlc3MnXHJcbmltcG9ydCB7IGRlZmF1bHRUaGVtZSB9IGZyb20gJ0B2dWVwcmVzcy90aGVtZS1kZWZhdWx0J1xyXG5pbXBvcnQgeyB2aXRlQnVuZGxlciB9IGZyb20gJ0B2dWVwcmVzcy9idW5kbGVyLXZpdGUnXHJcbmltcG9ydCB7IHNlYXJjaFBsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tc2VhcmNoJ1xyXG5pbXBvcnQgeyBzaGlraVBsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tc2hpa2knXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVVc2VyQ29uZmlnKHtcclxuICBsYW5nOiAncnUtUlUnLFxyXG4gIHRpdGxlOiAnTmVvIFNjcml0cHRzIEx1YSBBUEknLFxyXG4gIGRlc2NyaXB0aW9uOiAnV2lraSBmb3IgdGhlIE5lbyBTY3JpcHRzIG1vZCcsXHJcblxyXG4gIC8vIDEuIFx1MDQxMlx1MDQzMFx1MDQzNlx1MDQzRFx1MDQzRTogXHUwNDMxXHUwNDMwXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDRCXHUwNDM5IFVSTC1cdTA0M0ZcdTA0NDNcdTA0NDJcdTA0NEMuIFx1MDQxNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRCBcdTA0NDFcdTA0M0VcdTA0MzJcdTA0M0ZcdTA0MzBcdTA0MzRcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDQxIFx1MDQzRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNVx1MDQzQyBcdTA0M0ZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0MzggXHUwNDMyIGh0ZG9jcy5cclxuICAvLyBcdTA0MUVcdTA0MzFcdTA0NEZcdTA0MzdcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0UgXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM1XHUwNDNEIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQzRFx1MDQzMFx1MDQ0Mlx1MDQ0Q1x1MDQ0MVx1MDQ0RiBcdTA0MzggXHUwNDM3XHUwNDMwXHUwNDNBXHUwNDMwXHUwNDNEXHUwNDQ3XHUwNDM4XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDXHUwNDQxXHUwNDRGIFx1MDQzQVx1MDQzRVx1MDQ0MVx1MDQzRVx1MDQzOSBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzkgKC8pLlxyXG4gIGJhc2U6ICcvd2lraS8xLjIxLjExLycsXHJcbiAgXHJcbiAgcGx1Z2luczogW1xyXG4gICAgc2VhcmNoUGx1Z2luKHtcclxuXHQgIGxvY2FsZXM6IHtcclxuICAgICAgICAnLyc6IHtcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgICcvcnUvJzoge1xyXG4gICAgICAgICAgcGxhY2Vob2xkZXI6ICdcdTA0MUZcdTA0M0VcdTA0MzhcdTA0NDFcdTA0M0EnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGlzU2VhcmNoYWJsZTogKHBhZ2UpID0+IHBhZ2UucGF0aCAhPT0gJy8nLFxyXG4gICAgfSksXHJcblx0c2hpa2lQbHVnaW4oe1xyXG4gICAgICAvLyBvcHRpb25zXHJcblx0ICB0aGVtZTogJ2dpdGh1Yi1kYXJrJyxcclxuICAgICAgbGFuZ3M6IFsndHMnLCAnanNvbicsICd2dWUnLCAnbWQnLCAnYmFzaCcsICdkaWZmJywgJ2x1YSddLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBcclxuICAvLyBcdTA0MTRcdTA0M0VcdTA0MzFcdTA0MzBcdTA0MzJcdTA0M0JcdTA0NEZcdTA0MzVcdTA0M0MgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IEZvbnQgQXdlc29tZSBcdTA0MzIgXHUwNDQyXHUwNDM1XHUwNDMzIDxoZWFkPlxyXG4gIGhlYWQ6IFtcclxuICAgIFtcclxuICAgICAgJ2xpbmsnLCBcclxuICAgICAgeyBcclxuICAgICAgICByZWw6ICdzdHlsZXNoZWV0JywgXHJcbiAgICAgICAgaHJlZjogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS82LjUuMi9jc3MvYWxsLm1pbi5jc3MnIFxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgXSxcclxuICBcclxuICB0aGVtZTogZGVmYXVsdFRoZW1lKHtcclxuXHR0aGVtZVBsdWdpbnM6IHtcclxuICAgICAgcHJpc21qczogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgLy8gXHUwNDIwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0NDNcdTA0M0FcdTA0NDJcdTA0NDNcdTA0NDBcdTA0NEIgXHUwNDMxXHUwNDNFXHUwNDNBXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0RVxyXG4gICAgc2lkZWJhcjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ0dlbmVyYWwnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHUyNjk5XHVGRTBGIEdlbmVyYWxcIiwgbGluazogXCIvZ2VuZXJhbC9nZW5lcmFsLmh0bWxcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1RDgzRFx1REQxNCBFdmVudHNcIiwgbGluazogXCIvZ2VuZXJhbC9ldmVudHMuaHRtbFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHVEODNFXHVERTlGIFdpbmRvd1wiLCBsaW5rOiBcIi9nZW5lcmFsL3dpbmRvdy5odG1sXCIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ0xpYnMnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdGRkknLFxyXG5cdFx0XHRjb2xsYXBzaWJsZTogdHJ1ZSxcclxuXHRcdFx0Y2hpbGRyZW46IFsgXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGV4dDogJ0V4YW1wbGVzJyxcclxuXHRcdFx0XHRcdGxpbms6ICcvbGlicy9mZmkvZXhhbXBsZXMuaHRtbCcgXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1RDgzRFx1RENDNCBFbmNvZGluZ1wiLCBsaW5rOiBcIi9saWJzL2VuY29kaW5nLmh0bWxcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1MjcwRlx1RkUwRiBUZXh0IEJ1aWxkZXJcIiwgbGluazogXCIvbGlicy90ZXh0LWJ1aWxkZXIuaHRtbFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHUyNzk1IENyZWF0b3JcIiwgbGluazogXCIvbGlicy9jcmVhdG9yLmh0bWxcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1RDgzQ1x1REYxMCBIdHRwXCIsIGxpbms6IFwiL2xpYnMvaHR0cC5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0NcdURGMTAgVENQXCIsIGxpbms6IFwiL2xpYnMvdGNwLmh0bWxcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1RDgzRFx1RENDNCBKc29uXCIsIGxpbms6IFwiL2xpYnMvanNvbi5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0RcdURDRTYgQXJjaGl2ZVwiLCBsaW5rOiBcIi9saWJzL2FyY2hpdmUuaHRtbFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHVEODNFXHVEREYxIEJsb2NrcyBSZWdpc3RyeVwiLCBsaW5rOiBcIi9saWJzL2Jsb2Nrcy5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0VcdURFQTMgSXRlbXMgUmVnaXN0cnlcIiwgbGluazogXCIvbGlicy9pdGVtcy5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0RcdURDNjUgRW50aXRpZXMgUmVnaXN0cnlcIiwgbGluazogXCIvbGlicy9lbnRpdGllcy5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0VcdURERjUgVGhyZWFkc1wiLCBsaW5rOiBcIi9saWJzL3RocmVhZHMuaHRtbFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHVEODNEXHVEREZBXHVGRTBGIFhhZXJvIE1pbmltYXBcIiwgbGluazogXCIvbGlicy94YWVyby1taW5pbWFwLmh0bWxcIiB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REMzMSBDYXRib29zdFwiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9saWJzL2NhdGJvb3N0L2luZGV4Lmh0bWxcIixcclxuICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJNb2RlbFwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbGlicy9jYXRib29zdC9jYXQtYm9vc3QtbW9kZWwvaW5kZXguaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQcmVkaWN0aW9uc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL2xpYnMvY2F0Ym9vc3QvY2F0LWJvb3N0LW1vZGVsL2NhdC1ib29zdC1wcmVkaWN0aW9ucy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRVx1RERFMCBEZWVwIEphdmEgTGVhcm5pbmcgKGRqbClcIixcclxuICAgICAgICAgICAgbGluazogXCIvbGlicy9kZWVwLWphdmEtbGVhcmluaW5nLWRqbDQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkV4YW1wbGVzXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2RlZXAtamF2YS1sZWFyaW5pbmctZGpsNC9leGFtcGxlcy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdcdUQ4M0RcdURDQkIgSW1HVUknLFxyXG5cdFx0XHRsaW5rOiAnL2xpYnMvaW1ndWkvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiQ29uc3RhbnRzXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL2NvbnN0YW50cy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkRyYXdMaXN0XCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL2RyYXctbGlzdC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REQyNyBDb21wb25lbnRzXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL2NvbXBvbmVudHMuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJXaW5kb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL3dpbmRvdy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldpZGdldHNcIixcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL3dpZGdldHMuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJMYXlvdXRcIixcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL2xheW91dC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlRhYmxlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL2xpYnMvaW1ndWkvdGFibGVzLmh0bWxcIixcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTWVudXMgJiBQb3B1cHNcIixcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL21lbnVzLmh0bWxcIixcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU3R5bGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL2xpYnMvaW1ndWkvc3R5bGluZy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlN0YXRlIFF1ZXJpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9saWJzL2ltZ3VpL3N0YXRlLmh0bWxcIixcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdEYXRhVHlwZXMnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHVEODNEXHVEQ0U2IEJveFwiLCBsaW5rOiBcIi9kYXRhdHlwZXMvYm94Lmh0bWxcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1RDgzRFx1RERGQVx1RkUwRiBNYXBcIiwgbGluazogXCIvZGF0YXR5cGVzL21hcC5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTI2OTRcdUZFMEYgSXRlbVwiLCBsaW5rOiBcIi9kYXRhdHlwZXMvaXRlbS5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0RcdURDN0QgRW50aXR5XCIsIGxpbms6IFwiL2RhdGF0eXBlcy9lbnRpdHkuaHRtbFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHVEODNFXHVEREYxIEJsb2NrXCIsIGxpbms6IFwiL2RhdGF0eXBlcy9ibG9jay5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0VcdURERUQgVmVjdG9yM1wiLCBsaW5rOiBcIi9kYXRhdHlwZXMvdmVjdG9yMy5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0VcdURERUQgQmxvY2tQb3NcIiwgbGluazogXCIvZGF0YXR5cGVzL2Jsb2NrUG9zLmh0bWxcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1RDgzQ1x1REZBRiBEaXJlY3Rpb25cIiwgbGluazogXCIvZGF0YXR5cGVzL2RpcmVjdGlvbi5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0VcdURERUQgQXhpc1wiLCBsaW5rOiBcIi9kYXRhdHlwZXMvYXhpcy5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0VcdURERUQgQXhpc0RpcmVjdGlvblwiLCBsaW5rOiBcIi9kYXRhdHlwZXMvYXhpcy1kaXJlY3Rpb24uaHRtbFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHVEODNEXHVEQ0QwIFJheWNhc3RcIiwgbGluazogXCIvZGF0YXR5cGVzL3JheWNhc3QuaHRtbFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHVEODNEXHVEQ0REIENvbXBvbmVudFwiLCBsaW5rOiBcIi9kYXRhdHlwZXMvY29tcG9uZW50Lmh0bWxcIiB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcblx0ICB7XHJcbiAgICAgICAgdGV4dDogJ1BsYXllciBPYmplY3RzJyxcclxuXHRcdGxpbms6ICcvcGxheWVyLW9iamVjdHMvcGxheWVyL2luZGV4Lmh0bWwnLFxyXG5cdFx0Y29sbGFwc2libGU6IHRydWUsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0RcdURDRDYgUGxheWVyXCIsIGxpbms6IFwiL3BsYXllci1vYmplY3RzL3BsYXllci9pbmRleC5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTIzMjhcdUZFMEYgSW5wdXRcIiwgbGluazogXCIvcGxheWVyLW9iamVjdHMvcGxheWVyL2lucHV0Lmh0bWxcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1RDgzQ1x1REY5MiBJbnZlbnRvcnlcIiwgbGluazogXCIvcGxheWVyLW9iamVjdHMvcGxheWVyL2ludmVudG9yeS5odG1sXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdUQ4M0NcdURGMTAgTmV0d29ya1wiLCBsaW5rOiBcIi9wbGF5ZXItb2JqZWN0cy9wbGF5ZXIvbmV0d29yay5odG1sXCIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJXb3JsZFwiLFxyXG4gICAgICAgIGxpbms6IFwiL3dvcmxkLW9iamVjdHMvd29ybGQuaHRtbFwiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiQmxvY2sgaXRlcmF0b3JcIiwgbGluazogXCIvd29ybGQtb2JqZWN0cy9ibG9jay1zY2FubmVyLmh0bWxcIiB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcblx0ICB7XHJcbiAgICAgICAgdGV4dDogJ1JlbmRlcmluZyBPYmplY3RzJyxcclxuXHRcdGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICcyRCBSZW5kZXJpbmcnLCBsaW5rOiAnL3JlbmRlcmluZy1vYmplY3RzLzJkLXJlbmRlcmVyLmh0bWwnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICczRCBSZW5kZXJpbmcnLCBsaW5rOiAnL3JlbmRlcmluZy1vYmplY3RzL3dvcmxkLXJlbmRlcmVyLmh0bWwnIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSksXHJcblxyXG4gIC8vIDIuIFx1MDQxRlx1MDQ0M1x1MDQ0Mlx1MDQ0QywgXHUwNDNBXHUwNDQzXHUwNDM0XHUwNDMwIFZ1ZVByZXNzIFx1MDQzMVx1MDQ0M1x1MDQzNFx1MDQzNVx1MDQ0MiBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0NEZcdTA0NDJcdTA0NEMgXHUwNDQxXHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQ0NFx1MDQzMFx1MDQzOVx1MDQzQlx1MDQ0QiBcdTA0M0ZcdTA0NDBcdTA0MzggXHUwNDQxXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDNBXHUwNDM1LlxyXG4gIC8vIFx1MDQyM1x1MDQzQVx1MDQzMFx1MDQzN1x1MDQ0Qlx1MDQzMlx1MDQzMFx1MDQzNVx1MDQzQyBcdTA0M0ZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0NDMgaHRkb2NzIFx1MDQzMlx1MDQzRFx1MDQ0M1x1MDQ0Mlx1MDQ0MFx1MDQzOCBcdTA0MzJcdTA0MzBcdTA0NDhcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFhBTVBQLlxyXG4gIGRlc3Q6ICdDOi94YW1wcC9odGRvY3Mvd2lraS8xLjIxLjExJyxcclxuXHJcbiAgYnVuZGxlcjogdml0ZUJ1bmRsZXIoKSxcclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXdRLFNBQVMsd0JBQXdC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
