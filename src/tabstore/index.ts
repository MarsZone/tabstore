import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'
import material from '@primevue/themes/material';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './app.vue'
import router from './router';
import '@/assets/base.scss'
import './index.scss'
import './assets/styles.scss';
import './assets/tailwind.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap";

const app = createApp(App);

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
