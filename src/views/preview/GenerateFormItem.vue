<template>
    <el-form-item :label="widget.name" :prop="widget.model">
        <template v-if="widget.type == 'input'" >
            <el-input v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
                :type="widget.options.dataType"
                v-model.number="dataModel"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}"
                :disabled="widget.options.disabled">
            </el-input>
            <el-input v-else
                :type="widget.options.dataType"
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}">
            </el-input>
        </template>

        <template v-if="widget.type == 'textarea'">
            <el-input type="textarea" :rows="5"
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}">
            </el-input>
        </template>

        <template v-if="widget.type == 'number'">
            <el-input-number
                v-model="dataModel"
                :style="{width: widget.options.width}"
                :step="widget.options.step"
                :disabled="widget.options.disabled">
            </el-input-number>
        </template>

        <template v-if="widget.type == 'radio'">
            <el-radio-group v-model="dataModel"
                :style="{width: widget.options.width}"
                :disabled="widget.options.disabled">
                <el-radio :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
                    :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index">
                    <template v-if="widget.options.remote">{{item.label}}</template>
                    <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
                </el-radio>
            </el-radio-group>
        </template>

        <template v-if="widget.type == 'checkbox'">
            <el-checkbox-group v-model="dataModel"
                :style="{width: widget.options.width}"
                :disabled="widget.options.disabled">
                <el-checkbox :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
                    :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index">
                    <template v-if="widget.options.remote">{{item.label}}</template>
                    <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
                </el-checkbox>
            </el-checkbox-group>
        </template>

        <template v-if="widget.type=='date'">
            <el-date-picker v-model="dataModel"
                :type="widget.options.type"
                :placeholder="widget.options.placeholder"
                :start-placeholder="widget.options.startPlaceholder"
                :end-placeholder="widget.options.endPlaceholder"
                :readonly="widget.options.readonly"
                :disabled="widget.options.disabled"
                :editable="widget.options.editable"
                :clearable="widget.options.clearable"
                :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
                :format="widget.options.format"
                :style="{width: widget.options.width}">
            </el-date-picker>
        </template>

        <template v-if="widget.type == 'select'">
            <el-select v-model="dataModel"
                :disabled="widget.options.disabled"
                :multiple="widget.options.multiple"
                :clearable="widget.options.clearable"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}"
                :filterable="widget.options.filterable">
                <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
            </el-select>
        </template>
    </el-form-item>
</template>

<script>
export default {
    name: 'GenerateFormItem',
    props: ['widget', 'models', 'rules'],
    data () {
        return {
            dataModel: this.models[this.widget.model]
        }
    },
    watch: {
        dataModel: {
            handler (val) {
                this.models[this.widget.model] = val
                this.$emit('update:models', {
                    ...this.models,
                    [this.widget.model]: val
                })
                this.$emit('input-change', val, this.widget.model)
            },
            deep: true
        },
        models: {
            handler (val) {
                console.log(val)
                this.dataModel = val[this.widget.model]
            },
            deep: true
        }
    },
    created () {
        // console.log(this.widget)
        if (this.widget.options.remote) {
            // ajax请求获取选项
            this.widget.options.remoteOptions = [
                { label: '1', value: '1111' },
                { label: '2', value: '2222' },
                { label: '3', value: '3333' }
            ]
        }
    }
}
</script>

<style lang="less" scoped>

</style>
