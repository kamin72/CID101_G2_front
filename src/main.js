//js入口執行檔案

//引入scss
import './assets/sass/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
//swiper
import 'swiper/swiper-bundle.css'
