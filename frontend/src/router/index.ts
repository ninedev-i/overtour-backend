import Vue from 'vue'
import Router, {RouterOptions} from 'vue-router'
Vue.use(Router)

export function createRouter (): Router {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ x: 0, y: 0 }),
        routes: [
            {path: '/', component: () => import('../pages/Home.vue')},
            {path: '/tours', component: () => import('../pages/Tours.vue')},
            {path: '/roadmap', component: () => import('../pages/Roadmap.vue')},
            {path: '/admin', component: () => import('../pages/Admin.vue')},
        ]
    } as RouterOptions)
}
