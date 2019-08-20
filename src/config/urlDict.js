const urlDict = {
    token: {
        url: '/auth/secret/token', // 获取accessToken，密文交换的形式
        needLogin: false
    },
    userPermission: {
        url: '/auth/user/getUserPermissions', // 获取用户信息
        needLogin: true
    }
}
export default urlDict
