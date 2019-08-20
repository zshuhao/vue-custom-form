<template>
    <Container title="首页" message="客服数据看板">
        <!-- <div slot="header">
            <el-button>搜索</el-button>
        </div> -->
        <div slot="content">
            <Upload v-model="imglist">
                <i class="el-icon-plus"></i>
            </Upload>
        </div>
        <!-- <div slot="footer">
            <el-button size="small">footer</el-button>
        </div> -->
    </Container>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
    name: 'Dashboard',
    components: {
        Upload
    },
    data () {
        return {
            imglist: [{ name: 'test.jpg', url: 'http://test1.img.9now.net/te11002/application/20190806/160204_901d372c10.png' }]
        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>

</style>
