import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import 'uno.css'
import VueQrcode from '@chenfengyuan/vue-qrcode'

import './mock'
import '@/api/interceptor'

import '@/assets/style/global.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.component(VueQrcode.name, VueQrcode)

app.mount('#app')
