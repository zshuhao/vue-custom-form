<template>
    <el-form-item class="form-item" :label="element.name"
        v-if="element && element.key"
        :class="{ active: selectFormItem.key == element.key  }"
        @click.native.stop="handleSelectFormItem(index)">
        <template>
            <template v-if="element.type === 'input'">
                <el-input v-model="element.options.defaultValue"
                    :style="{width: element.options.width}"
                    :placeholder="element.options.placeholder"
                    :disabled="element.options.disabled">
                </el-input>
            </template>

            <template  v-if="element.type === 'textarea'">
                <el-input v-model="element.options.defaultValue"
                    type="textarea"
                    :rows="5"
                    :style="{width: element.options.width}"
                    :disabled="element.options.disabled"
                    :placeholder="element.options.placeholder">
                </el-input>
            </template>

            <template v-if="element.type === 'number'">
                <el-input-number v-model="element.options.defaultValue"
                    label="描述文字"
                    :disabled="element.options.disabled"
                    :step="element.options.step">
                </el-input-number>
            </template>

            <template v-if="element.type === 'radio'">
                <el-radio-group v-model="element.options.defaultValue"
                    :style="{width: element.options.width}"
                    :disabled="element.options.disabled">
                    <el-radio :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index">
                        {{element.options.showLabel ? item.label : item.value}}
                    </el-radio>
                </el-radio-group>
            </template>

            <template v-if="element.type === 'checkbox'">
                <el-checkbox-group v-model="element.options.defaultValue"
                    :style="{width: element.options.width}"
                    :disabled="element.options.disabled">
                    <el-checkbox
                        :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index">
                        {{element.options.showLabel ? item.label : item.value}}
                    </el-checkbox>
                </el-checkbox-group>
            </template>

            <template v-if="element.type === 'date'">
                <el-date-picker v-model="element.options.defaultValue"
                    :type="element.options.type"
                    :placeholder="element.options.placeholder"
                    :start-placeholder="element.options.startPlaceholder"
                    :end-placeholder="element.options.endPlaceholder"
                    :readonly="element.options.readonly"
                    :disabled="element.options.disabled"
                    :editable="element.options.editable"
                    :clearable="element.options.clearable"
                    :value-format="element.options.timestamp ? 'timestamp' : element.options.format"
                    :format="element.options.format"
                    :style="{width: element.options.width}">
                </el-date-picker>
            </template>

            <template v-if="element.type == 'select'">
                <el-select v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
                    :multiple="element.options.multiple"
                    :clearable="element.options.clearable"
                    :placeholder="element.options.placeholder"
                    :style="{width: element.options.width}">
                    <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value"></el-option>
                </el-select>
            </template>
        </template>
        <div class="widget-view-action" v-if="selectFormItem.key == element.key">
            <!-- <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
            <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i> -->
            <i class="el-icon-delete" @click.stop="handleWidgetDelete(index)"></i>
        </div>

        <div class="widget-view-drag" v-if="selectFormItem.key == element.key">
            <!-- <i class="iconfont icon-drag drag-widget"></i> -->
            <i class="el-icon-rank drag-widget"></i>
        </div>
    </el-form-item>
</template>

<script>
export default {
    name: 'WidgetItem',
    props: ['element', 'index', 'select', 'data'],
    data () {
        return {
            selectFormItem: this.select,
            CardBodyStyle: {
                padding: '8px 5px'
            }
        }
    },
    watch: {
        select (val) {
            this.selectFormItem = val
        },
        selectFormItem: {
            handler (val) {
                console.log(1111)
                console.log(val)
                this.$emit('update:select', val)
            },
            deep: true
        }
    },
    methods: {
        handleSelectFormItem (index) {
            this.selectFormItem = this.data.list[index]
        },
        handleWidgetDelete (index) {
            if (this.data.list.length - 1 === index) {
                if (index === 0) {
                    this.selectFormItem = {}
                } else {
                    this.selectFormItem = this.data.list[index - 1]
                }
            } else {
                this.selectFormItem = this.data.list[index + 1]
            }
            this.$nextTick(() => {
                this.data.list.splice(index, 1)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.form-item {
    padding: 15px 5px;
    position: relative;
    border: 1px dashed rgba(170,170,170,0.7);
    background-color: rgba(236, 245, 255, .3);
    margin: 2px;
    &:hover{
        background: #ecf5ff;
        outline: 1px solid #409EFF;
        outline-offset: 0px;

        &.active{
            outline: 2px solid #409EFF;
            border: 1px solid #409EFF;
            outline-offset: 0;
        }

        .widget-view-drag{
            display: block;
        }
    }
    &:after{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: block;
    }

    &.active{
        outline: 2px solid #409EFF;
        border: 1px solid #409EFF;
    }
    .widget-view-action {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 28px;
        line-height: 28px;
        background: rgba(64, 158, 255, 0.59);
        z-index: 9;

        i {
            font-size: 14px;
            color: #fff;
            margin: 0 5px;
            cursor: pointer;
        }
    }
    .widget-view-drag {
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0px;
        height: 28px;
        line-height: 28px;
        background: rgba(64, 158, 255, 0.59);
        z-index: 9;
        // display: none;

        i{
            font-size: 14px;
            color: #fff;
            margin: 0 5px;
            cursor: move;
        }
    }
}
</style>
<style lang="less">
.form-item {
    .el-form-item__content {
        position: unset;
    }
}
</style>
