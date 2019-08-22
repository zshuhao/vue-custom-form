<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            visibleSider: true
        }
    }
}
</script>

<style scoped lang="less">
// .header {
//     color: #666;
//     background-color: #f8f8f8;
//     border-bottom: 1px solid #ddd;
// }

// .el-main {
//     padding-top: 10px;
//     background-color: #eee;
// }

// .mian-container {
//     height: calc(100% - 60px);
// }

// // 侧边导航 动画
// .fade-enter-active, .fade-leave-active {
//     transition: margin-left .5s;
// }
// .fade-leave, .fade-enter-to  {
//     margin-left: 0;
// }
// .fade-enter, .fade-leave-to {
//     margin-left: -200px;
// }
</style>
