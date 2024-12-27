import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog';
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'
import material from '@primevue/themes/material';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import AppLayout from '../tabstore/layout/AppLayout.vue';
import App from './app.vue'
// import router from './router';
import routes from '~pages'
import '@/assets/base.scss'
import './index.scss'
import './assets/styles.scss';
import './assets/tailwind.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap";

routes.push(
  {
  path: '/',
  redirect: '/tabstore',
  },
  {
    path: '/tabstore',
    name: 'tabstore',
    component: AppLayout,
    children: [
      {
          path: '/tabstore',
          name: 'index',
          component: () => import('../tabstore/pages/index.vue')
      },
    ]
  },
)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(PrimeVue, {
  theme:{
    preset:  material,
  }
});

app.use(ElementPlus)
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
