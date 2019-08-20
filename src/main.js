import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ajax from './util/ajax'

import './assets/reset.css'
import './assets/main.less'
import './assets/coverEle.less'
import './plugins/element.js'
import './plugins/custom.js'
import './plugins/draggable.js'

import { Message } from 'element-ui'
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$ajax = ajax

// 暂时不采取这种模式liteli 20190311
// router.beforeEach((to, from, next) => {
//     let accessToken = store.state.accessToken.token
//     if (to.path === '/' && accessToken) {
//         next()
//     } else if (!accessToken && to.path !== '/login') {
//         next({
//             path: '/login'
//         })
//     } else {
//         next()
//     }
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
