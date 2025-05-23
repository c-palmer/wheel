import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './lib/router'
import VueKonva from 'vue-konva'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueKonva)

app.mount('#app')
