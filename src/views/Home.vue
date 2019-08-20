<template>
    <el-container>
        <el-header class="header">
            <Header @toggleSider="visibleSider = !visibleSider" />
        </el-header>
        <el-container class="mian-container">
            <transition name="fade">
                <Sider v-if="visibleSider" class="sider" />
            </transition>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from './layouts/Header'
import Sider from './layouts/Sider'
export default {
    name: 'Home',
    components: {
        Header,
        Sider
    },
    data () {
        return {
            visibleSider: true
        }
    }
}
</script>

<style scoped lang="less">
.header {
    color: #666;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
}

.el-main {
    padding-top: 10px;
    background-color: #eee;
}

.mian-container {
    height: calc(100% - 60px);
}

// 侧边导航 动画
.fade-enter-active, .fade-leave-active {
    transition: margin-left .5s;
}
.fade-leave, .fade-enter-to  {
    margin-left: 0;
}
.fade-enter, .fade-leave-to {
    margin-left: -200px;
}
</style>
