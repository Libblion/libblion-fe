import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { pinia } from './services/pinia'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import library from './services/icon'



import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.component('EasyDataTable', Vue3EasyDataTable);
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)

app.use(router)

app.mount('#app')
