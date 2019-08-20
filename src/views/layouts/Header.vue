
<template>
    <div>
        <div class="logo">
            <img class="image" src="../../assets/logo-gray.png" alt="logo">
        </div>
        <i :class="['icon', toggleIcon ? 'el-icon-s-fold' : 'el-icon-s-unfold']" @click="$emit('toggleSider'); toggleIcon = !toggleIcon"></i>
        <el-dropdown class="login-out" trigger="click">
            <div class="username">
                <el-badge is-dot type="success">
                    <el-avatar class="user-image" src="ss">
                        <img src="../../assets/user.png" alt="user">
                    </el-avatar>
                </el-badge>
                <span>{{userInfo.userName || '美味不用等用户名'}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span class="out" @click="loginOut"><i class="el-icon-lock"></i>退出</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            toggleIcon: true
        }
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    methods: {
        loginOut () {
            const user = {
                userName: '美味不用等用户名',
                apartment: '',
                companyName: '美味不用等(上海)信息科技股份有限公司'
            }
            this.$store.commit('AUTH', {})
            this.$store.commit('USERINFO', { ...user })
            // this.$router.push({ path: '/login' })
        }
    }
}
</script>

<style lang="less" scoped>
.logo {
    float: left;
    height: 60px;
    width: 200px;
    display: flex;
    align-items: center;
    .image {
        width: 160px;
    }
}
.icon {
    font-size: 19px;
    line-height: 60px;
    cursor: pointer;
}
.login-out {
    float: right;
    height: 58px;
    line-height: 58px;
    cursor: pointer;
    .username {
        .user-image {
            margin-right: 10px;
            width: 40px;
            height: 40px;
            border: 1px solid #eee;
        }
        span {
            vertical-align: middle;
        }
    }
}
.out {
    i {
        font-size: 14px;
        margin-right:5px;
    }
}
</style>
<style lang="less">
.login-out .username .el-badge .el-badge__content.is-fixed.is-dot {
    right: 18px;
    top: 13px;
}
</style>
