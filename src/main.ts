import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import './mock'
import '@/api/interceptor'

import AcroIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/modal/style/css.js'
import '@/assets/style/global.less'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(AcroIcon)

app.mount('#app')
