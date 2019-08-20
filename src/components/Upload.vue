<template>
    <div>
        <el-upload :class="{ 'my-upload': listType === 'picture-card' && !drag }" :action="url"
            :headers="head"
            :file-list="defaultImgList"
            :list-type="listType"
            :on-success="successEvent"
            :on-remove="removeEvent"
            :drag="drag"
            v-bind="$attrs"
            v-on="$listeners">
            <slot></slot>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'Upload',
    props: {
        url: {
            type: String,
            default: 'http://kt-test.st.9now.net/base/downloadCenter/uploadFile'
        },
        value: {
            type: Array,
            default: () => []
        },
        header: {
            type: Object,
            default: () => null
        },
        listType: {
            type: String,
            default: 'picture-card'
        },
        onSuccess: {
            type: Function
        },
        onRemove: {
            type: Function
        },
        drag: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            head: this.header || {
                Authorization: `Bearer ${this.$store.state.auth.token}`
            },
            imgArr: [],
            successEvent: null,
            removeEvent: null
        }
    },
    computed: {
        defaultImgList () {
            return this.value
        }
    },
    mounted () {
        this.successEvent = typeof this.onSuccess === 'undefined' ? this.upsuccess : this.onSuccess
        this.removeEvent = typeof this.onRemove === 'undefined' ? this.upremove : this.onRemove
    },
    methods: {
        upsuccess (response, file, fileList) {
            this.formatImg(fileList)
        },
        upremove (file, fileList) {
            this.formatImg(fileList)
        },
        formatImg (arr) {
            this.imgArr = arr.map(item => {
                if ('response' in item) {
                    const { data, success } = item.response
                    return success ? {
                        name: item.name,
                        url: data.path,
                        status: item.status,
                        uid: item.uid
                    } : ''
                } else {
                    return item
                }
            }).filter(item => item !== '')
            this.$emit('input', this.imgArr)
        }
    }
}
</script>

<style lang="less" scoped>

</style>
<style lang="less">
.my-upload {
    .el-upload-list__item, .el-upload--picture-card, .el-progress-circle {
        height: 120px!important;
        width: 120px!important;
    }
    .el-upload--picture-card {
        line-height: 120px;
    }
    .el-progress {
        width: 120px;
    }
}
</style>
