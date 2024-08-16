import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "../page/main-page.vue";

const routes = [
    { path: '/home', name: 'home', component: MainPage },
    { path : '/:pathMatch(.*)*', component: MainPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }
    },
});

export default router
