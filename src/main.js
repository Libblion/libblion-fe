import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { pinia } from './services/pinia'

import library from './services/icon'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)


app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)

app.use(router)

app.mount('#app')
