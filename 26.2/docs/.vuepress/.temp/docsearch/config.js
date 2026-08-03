
import { DocSearch, injectDocSearchConfig } from "C:/wiki/node_modules/@vuepress/plugin-docsearch/dist/client/index.js"
import 'C:/wiki/node_modules/@docsearch/css/dist/style.css'
import 'C:/wiki/node_modules/@vuepress/plugin-docsearch/dist/client/styles/docsearch.css'
import 'C:/wiki/node_modules/@vuepress/plugin-docsearch/dist/client/styles/vars.css'

export default {
  enhance({ app }) {
    injectDocSearchConfig(app)
    app.component('SearchBox', DocSearch)
  },
}
