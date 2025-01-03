import { createApp } from 'vue'
import App from './App.vue'
import Particles from 'particles.vue3'
import './registerServiceWorker'
import './assets/jumpa.css'
import './assets/tailwind.css'
import router from './router'
import store from './store'

createApp(App).use(Particles).use(store).use(router).mount('#app')
