import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import PrimeVue from 'primevue/config';
import App from './app.vue'
import routes from '~pages'
import '../assets/base.scss'
import './index.scss'


routes.push({
  path: '/',
  redirect: '/options',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

createApp(App).use(PrimeVue).use(router).use(createPinia()).mount('#app')

// console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
