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
                console.log('list', val)
                console.log(this.models)
                this.generateModle(val.list)
            },
            deep: true
        },
        value: {
            handler (val) {
                console.log(JSON.stringify(val))
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
            // console.log(genList)
            // console.log(this.value)
            // console.log(this.models)
            for (let i = 0; i < genList.length; i++) {
                this.models[genList[i].model] = genList[i].options.defaultValue
                // if (genList[i].type === 'grid') {
                //     genList[i].columns.forEach(item => {
                //         this.generateModle(item.list)
                //     })
                // } else {
                //     if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
                //         this.models[genList[i].model] = this.value[genList[i].model]
                //     } else {
                //         if (genList[i].type === 'blank') {
                //             this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
                //         } else {
                //             this.models[genList[i].model] = genList[i].options.defaultValue
                //         }
                //     }

                //     if (this.rules[genList[i].model]) {
                //         this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
                //             if (item.pattern) {
                //                 // return { ...item, pattern: eval(item.pattern) }
                //             } else {
                //                 return { ...item }
                //             }
                //         })]
                //     } else {
                //         this.rules[genList[i].model] = [...genList[i].rules.map(item => {
                //             if (item.pattern) {
                //                 // return { ...item, pattern: eval(item.pattern) }
                //             } else {
                //                 return { ...item }
                //             }
                //         })]
                //     }
                // }
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
