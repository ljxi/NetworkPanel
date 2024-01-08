import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./assets/elm-theme.css"

const app = createApp(App)
app.use(VueClipboard)
app.use(ElementPlus)
app.mount('#app')