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
            redirect: '/bench',
            children: [
                {
                    path: '/bench',
                    name: 'Bench',
                    component: () => import(/* webpackChunkName: "about" */ './views/workspace/Bench.vue')
                },
                {
                    path: '/404', // 404
                    name: 'NoPage',
                    component: () => import(/* webpackChunkName: "about" */ './views/404.vue')
                }
            ]
        },
        { path: '*', redirect: '/404' }
    ]
})
