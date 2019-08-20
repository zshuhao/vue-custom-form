<template>
    <div class="my-form">
        <div v-if="data.list.length == 0" class="form-empty">从左侧拖拽来添加字段</div>
        <el-form :size="data.config.size"
            label-suffix=":"
            :label-position="data.config.labelPosition"
            :label-width="data.config.labelWidth + 'px'">
            <draggable class="form-area" v-model="data.list"
                group="people"
                handle='.drag-widget'
                ghost-class='ghost'
                :animation='200'
                @add="handleWidgetAdd">
                <transition-group name="fade" tag="div" class="form-list">
                    <template v-for="(item, index) in data.list">
                        <widget-form-item v-if="item && item.key" :key="item.key" :element="item" :index="index" :select.sync="selectFormItem" :data="data"></widget-form-item>
                    </template>
                </transition-group>
            </draggable>
        </el-form>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import WidgetFormItem from './WidgetItem'
export default {
    name: 'WidgetForm',
    components: {
        draggable,
        WidgetFormItem
    },
    props: ['data'],
    data () {
        return {
            selectFormItem: this.select
        }
    },
    watch: {
        selectFormItem: {
            handler (val) {
                this.$emit('update:select', val)
            },
            deep: true
        }
    },
    methods: {
        handleWidgetAdd (e) {
            // console.log(e)
            // console.log(this.data)
            const newIndex = e.newIndex
            // console.log(newIndex)
            // 为添加的元素生成唯一的key
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
            this.$set(this.data.list, newIndex, {
                ...this.data.list[newIndex],
                options: {
                    ...this.data.list[newIndex].options,
                    remoteFunc: 'func_' + key
                },
                key,
                // 绑定键值
                model: this.data.list[newIndex].type + '_' + key,
                rules: []
            })

            if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
                this.$set(this.data.list, newIndex, {
                    ...this.data.list[newIndex],
                    options: {
                        ...this.data.list[newIndex].options,
                        options: this.data.list[newIndex].options.options.map(item => ({
                            ...item
                        }))
                    }
                })
            }
            this.selectFormItem = this.data.list[newIndex]
            console.log(this.selectFormItem)
        }
    }
}
</script>

<style lang="less" scoped>
.my-form {
    position: relative;
    padding: 2px;
    .form-area, .form-list {
        min-height: 500px;
    }
    .form-empty {
        position: absolute;
        text-align: center;
        font-size: 20px;
        left: 0;
        right: 0;
        top: 150px;
        color: #ccc;
    }
}

</style>
