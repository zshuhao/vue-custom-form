import store from '../store/index'
/**
 * 检查是否在登录状态
 * @returns {Boolean} true 登录状态  false 未登录状态
 */
const checkLogin = () => {
    const { auth } = store.state
    const currentTime = new Date()
    if (auth.token && auth.token !== 'undefined') {
        return !(currentTime > new Date(auth.expired))
    } else {
        return false
    }
}
export default checkLogin
