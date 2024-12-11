import AppLayout from '@tabstore/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/src/tabstore',
            component: AppLayout,
            children: [
                {
                    path: '/src/tabstore',
                    name: 'index',
                    component: () => import('@tabstore/pages/index.vue')
                },
                {
                    path: '/src/tabstore/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@tabstore/uikit/FormLayout.vue')
                },
            ]
        },
    ]
});

export default router;
