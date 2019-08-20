// import axios from 'axios'
// import store from '../store/index'
// import env from '../config/env'
// // import basicToken from '../config/basicToken'
// import { Message } from 'element-ui'
// import urlDict from '../config/urlDict'

// axios.defaults.timeout = 30000 // 请求的超时时间

// const protocol = env === 'production' ? 'https:' : 'http:'

// const api = {
//     dev: '//kt-test.st.9now.net',
//     test: '//kt-test.st.9now.net',
//     production: '//gateway-infc.mwee.cn'
// }

// // 响应拦截器
// axios.interceptors.response.use(res => {
//     if (res.status && res.status === 200 && res.data.success) {
//         return res
//     } else {
//         // 状态200但是报错的情况
//         if (!res.data) {
//             Message.error({ message: res.data.sysErrDesc })
//         } else if (res.data && res.data.sysErrDesc) {
//             Message.error({ message: res.data.sysErrDesc || res.data.sysExcep })
//         } else if (res.data && res.data.data && res.data.data.err && res.data.data.err.errMsg) {
//             Message.error({ message: res.data.data.err.errMsg })
//         }
//         return res
//     }
// }, (err) => {
//     if (err && err.response) {
//         switch (err.response.status) {
//         case 400:
//             err.message = err.response.data.sysErrDesc || '账号异常'
//             break
//         case 401:
//             err.message = err.response.data.sysErrDesc || '登录失效，请重新登录!'
//             break
//         case 403:
//             err.message = err.response.data.sysErrDesc || '您无权限操作'
//             break
//         case 500:
//             err.message = err.response.data.sysErrDesc || '服务器内部错误'
//             break
//         }
//         Message.error(err.message)
//     } else if (typeof err.response === 'undefined') {
//         Message.error('请退出重新登录再试')
//     }
//     return Promise.reject(err)
// })

// /**
//  * 函数的参数options为axios的配置
//  * method => 方法名 "POST"等
//  * url => 路径,实际调用时传type即可，即为urlDict的key
//  * data => 数据的对象
//  * 调用前将type值转为对应的url
//  */
// const ajax = options => {
//     let header = options.headers || options.header || {
//         'Content-Type': 'application/json;charset=UTF-8'
//     }
//     if (urlDict[options.type].needLogin) {
//         header.Authorization = `Bearer ${store.state.auth.token}`
//     } else {
//         header.Authorization = `Basic ${basicToken}`
//     }
//     options.headers = header
//     options.method = options.method || 'POST'
//     options.url = protocol + api[env] + urlDict[options.type].url
//     !options.data && (options.data = {})
//     if (options.method.toUpperCase() === 'GET') {
//         options.params = options.data || {}
//     } else {
//         options.data = options.data || {}
//     }
//     return axios(options)
// }

// export default ajax
