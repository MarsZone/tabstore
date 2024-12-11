import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'
import material from '@primevue/themes/material';
import App from './app.vue'
import router from './router';
// import routes from '~pages'
import '@/assets/base.scss'
import './index.scss'
import './assets/styles.scss';
import './assets/tailwind.css';

// routes.push({
//   path: '/',
//   redirect: '/tabstore',
// })

// const router = createRouter({
//   history: createWebHashHistory(import.meta.env.BASE_URL),
//   routes,
// })


const app = createApp(App);

app.use(PrimeVue, {
  theme:{
    preset:  material,
  }
});

app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(createPinia())
app.mount('#app')

console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
