import AppLayout from '@tabstore/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
declare module './router' {
    
    export default router;
}

export function getRoutes(): any {
  throw new Error('Function not implemented.');
}
