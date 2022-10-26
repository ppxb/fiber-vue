import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import './mock'
import '@/api/interceptor'

import '@arco-design/web-vue/es/message/style/css.js'
import '@/assets/style/global.less'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
