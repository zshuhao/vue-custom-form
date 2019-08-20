import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/dashboard',
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
                },
                {
                    path: '/workbench',
                    name: 'Workbench',
                    component: () => import(/* webpackChunkName: "about" */ './views/edit/WorkBench.vue')
                },
                {
                    path: '/404', // 404
                    name: 'NoPage',
                    component: () => import(/* webpackChunkName: "about" */ './views/404.vue')
                }
            ]
        },
        {
            path: '/login', // 登录
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
        },
        { path: '*', redirect: '/404' }
    ]
})
