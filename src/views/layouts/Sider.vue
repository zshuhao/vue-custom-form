<template>
    <el-aside class="sider">
        <el-menu class="menu" :router="true" :default-active="$route.path">
            <el-menu-item index="/">
                <i class="el-icon-house"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-shopping-bag-1"></i>
                    <span>菜单</span>
                </template>
                <el-menu-item index="/workbench">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">工作台</span>
                </el-menu-item>
                <el-menu-item index="/dddds">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">子菜单2</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>

export default {
    name: 'Sider'
}
</script>

<style lang="less" scoped>

.el-menu-item, .el-submenu {
    span {
        color: #666;
    }
}
.el-submenu .el-menu .el-menu-item {
    color: #666;
}
.sider {
    width: 201px !important;
    background-color: #ffffff;
    .menu {
        height: 100%;
        .icon {
            font-size: 16px;
        }
    }
}

// 修改侧边导航的默认样式
.menu:not(.el-menu--collapse) {
    width: 200px;
}
.menu /deep/ .el-submenu__title {
    background-color: #ffffff;
    height: 42px;
    line-height: 42px;
}
.menu /deep/ .el-menu-item {
    height: 39px;
    line-height: 39px;
}
.menu  /deep/ .el-submenu .is-active {
    i {
        color: #409EFF;
    }
    background-color: #f2f6f9;
}
.menu  /deep/ .is-active {
    background-color: #f2f6f9;
}
</style>
