<template>
    <el-form ref="generateForm" :size="data.config.size" :model="models" :rules="rules"
        :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
        <template  v-for="item in data.list">
            <genetate-form-item
                :key="item.key"
                :models.sync="models"
                :rules="rules"
                :widget="item"
                @input-change="onInputChange">
            </genetate-form-item>
        </template>
    </el-form>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'
export default {
    name: 'GenerateForm',
    components: { GenetateFormItem },
    props: ['data', 'value'],
    data () {
        return {
            models: {},
            rules: {}
        }
    },
    watch: {
        data: {
            handler (val) {
                this.generateModle(val.list)
            },
            deep: true
        },
        value: {
            handler (val) {
                this.models = { ...this.models, ...val }
            },
            deep: true
        }
    },
    created () {
        this.generateModle(this.data.list)
    },
    methods: {
        generateModle (genList) {
            for (let i = 0; i < genList.length; i++) {
                this.models[genList[i].model] = genList[i].options.defaultValue

                /* eslint-disable */
                if (this.rules[genList[i].model]) {
                    this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
                        if (item.pattern) {
                            return { ...item, pattern: eval(item.pattern) }
                        } else {
                            return { ...item }
                        }
                    })]
                } else {
                    this.rules[genList[i].model] = [...genList[i].rules.map(item => {
                        if (item.pattern) {
                            return { ...item, pattern: eval(item.pattern) }
                        } else {
                            return { ...item }
                        }
                    })]
                }
                /* eslint-enable */
            }
        },
        getData () {
            return new Promise((resolve, reject) => {
                this.$refs.generateForm.validate(valid => {
                    if (valid) {
                        resolve(this.models)
                    } else {
                        reject(new Error('表单数据校验失败').message)
                    }
                })
            })
        },
        onInputChange (value, field) {
            // this.$emit('on-change', field, value, this.models)
        }
    }
}
</script>

<style lang="less" scoped>

</style>
