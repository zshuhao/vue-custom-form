<template>
    <div class="widget-config-container" v-if="show">
        <el-form label-position="top" size="mini">
            <el-form-item label="标题">
                <el-input v-model="data.name"></el-input>
            </el-form-item>

            <el-form-item label="描述" v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')">
                <el-input v-model="data.options.placeholder"></el-input>
            </el-form-item>

            <el-form-item label="宽度" v-if="Object.keys(data.options).indexOf('width')>=0">
                <el-input v-model="data.options.width"></el-input>
            </el-form-item>

            <el-form-item label="格式" v-if="data.type === 'date'">
                <el-select v-model="data.options.type" @change="handleDateTypeChange" placeholder="请选择">
                    <el-option label="日期" value="date"></el-option>
                    <el-option label="日期时间" value="datetime"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="默认值" v-if="data.type !== 'date' && data.type !== 'radio' && data.type !== 'checkbox' && data.type !== 'select'">
                <el-input v-model="data.options.defaultValue"></el-input>
            </el-form-item>

            <el-form-item label="布局方式" v-if="Object.keys(data.options).indexOf('inline')>=0">
                <el-radio-group v-model="data.options.inline">
                    <el-radio-button :label="false">块级</el-radio-button>
                    <el-radio-button :label="true">行内</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="是否多选" v-if="data.type=='select' || data.type=='imgupload'">
                <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
            </el-form-item>

            <!-- 选项数据全从后端取 -->
            <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options') >= 0">
                <template v-if="data.options.remote">
                    <div class="input-group">
                        <el-input size="mini" style="" v-model="data.options.fetchType">
                            <template slot="prepend">Type</template>
                        </el-input>
                        <el-input size="mini" style="" v-model="data.options.props.value">
                            <template slot="prepend">值</template>
                        </el-input>
                        <el-input size="mini" style="" v-model="data.options.props.label">
                            <template slot="prepend">标签</template>
                        </el-input>
                    </div>
                </template>
            </el-form-item>

            <!-- 选项自配的方式 暂时不采用 -->
            <!-- <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options') >= 0">
                <template v-if="data.type === 'radio' || (data.type=='select'&&!data.options.multiple)">
                    <el-radio-group v-model="data.options.defaultValue">
                        <draggable tag="ul" :list="data.options.options"
                            v-bind="{ group: { name:'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
                            handle=".drag-item">
                            <li v-for="(item, index) in data.options.options" :key="index">
                                <el-radio :label="item.value"  style="margin-right: 5px;">
                                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                                </el-radio>
                                <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="el-icon-rank"></i></i>
                                <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;"></el-button>
                            </li>
                        </draggable>
                    </el-radio-group>
                </template>
                <template v-if="data.type === 'checkbox' || (data.type=='select' && data.options.multiple)">
                    <el-checkbox-group v-model="data.options.defaultValue">
                        <draggable tag="ul" :list="data.options.options"
                            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                            handle=".drag-item">
                            <li v-for="(item, index) in data.options.options" :key="index" >
                                <el-checkbox :label="item.value" style="margin-right: 5px;">
                                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                                </el-checkbox>
                                <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="el-icon-rank"></i></i>
                                <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;"></el-button>
                            </li>
                        </draggable>
                    </el-checkbox-group>
                </template>

                <div style="margin-left: 22px;">
                    <el-button type="text" @click="handleAddOption">添加选项</el-button>
                </div>
            </el-form-item> -->

            <el-form-item label="效验">
                <el-radio-group v-model="data.options.required">
                    <el-radio :label="true">必填</el-radio>
                    <el-radio :label="false">非必填</el-radio>
                </el-radio-group>
                <div v-if="data.type === 'number'">
                    保留几位小数：<el-input-number v-model="afew" @change="handleChange" :min="0" :max="5" label="描述文字"></el-input-number>
                </div>
            </el-form-item>

            <el-form-item label="字段权限">
                <el-radio-group v-model="data.options.disabled">
                    <el-radio :label="true">不可编辑</el-radio>
                    <el-radio :label="false">可编辑</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'WidgetConfig',
    props: ['data'],
    data () {
        return {
            afew: 0,
            validator: {
                type: null,
                required: null,
                pattern: null,
                range: null,
                length: null
            }
        }
    },
    watch: {
        'data.options.required' (val) { // 监听是否设置必填
            this.validateRequired(val)
        },
        'data.name' (val) {
            if (this.data.options) {
                this.validateRequired(this.data.options.required)
            }
        }
    },
    computed: {
        show () {
            if (this.data && Object.keys(this.data).length > 0) {
                return true
            }
            return false
        }
    },
    methods: {
        validateRequired (val) {
            if (val) {
                this.validator.required = { required: true, message: `${this.data.name}必须填写` }
            } else {
                this.validator.required = null
            }

            this.$nextTick(() => {
                this.generateRule()
            })
        },
        generateRule () { // 生成该元素效验规则
            this.data.rules = []
            Object.keys(this.validator).forEach(key => {
                if (this.validator[key]) {
                    this.data.rules.push(this.validator[key])
                }
            })
        },
        handleChange (val) {
            this.data.options.step = val === 0 ? 1 : 1 / (val * 10)
        },
        handleDateTypeChange (val) {
            this.data.options.format = val === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'
        },
        handleOptionsRemove (index) {
            this.data.options.options.splice(index, 1)
        },
        handleAddOption () {
            // if (this.data.options.showLabel) {
            //     this.data.options.options.push({
            //         value: '新选项',
            //         label: '新选项'
            //     })
            // } else {
            this.data.options.options.push({
                value: '新选项'
            })
            // }
        },
        handleSelectMuliple (value) {
            if (value) {
                if (this.data.options.defaultValue) {
                    this.data.options.defaultValue = [this.data.options.defaultValue]
                } else {
                    this.data.options.defaultValue = []
                }
            } else {
                if (this.data.options.defaultValue.length > 0) {
                    this.data.options.defaultValue = this.data.options.defaultValue[0]
                } else {
                    this.data.options.defaultValue = ''
                }
            }
        }
    }
}
</script>

<style lang="less">
.widget-config-container {
    .el-form-item__label {
        padding-bottom: 5px;
        font-size: 13px;
        font-weight: 500;
    }
    .el-form-item {
        border-bottom: solid 1px #e1e1e1;
        padding-bottom: 10px;
    }
    .input-group {
        line-height: 32px;
    }
}
</style>
