import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'
import material from '@primevue/themes/material';
import ElementPlus from 'element-plus'
import App from './app.vue'
import routes from '~pages'
import 'vite-plugin-vue-devtools/src//overlay/devtools-overlay.css';
// import '@/assets/base.scss'
import './index.scss'
import 'element-plus/dist/index.css'

routes.push({
  path: '/',
  redirect: '/popup',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App);

app.use(PrimeVue, {
  theme:{
    preset:  material,
  }
});

app.use(ElementPlus)
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(router)
app.use(createPinia())
app.mount('#app')

console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
