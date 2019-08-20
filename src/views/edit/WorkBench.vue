<template>
    <Container no-default-style>
        <div class="header" slot="header">
            <div class="title">工作台</div>
            <div class="btn-grop">
                <el-button type="primary" size="mini"  @click="handlePreviewJson">展示JSON</el-button>
                <el-button type="primary" size="mini"  @click="handlePreview">预览</el-button>
            </div>
        </div>
        <div class="container" slot="content">
            <el-container>
                <el-aside class="area-left" width="250px">
                    <div class="widget-category">基础字段</div>
                    <div class="widget-list">
                        <draggable :list="basicElem"
                            :group="{ name: 'people', pull: 'clone', put: false }"
                            :sort="false"
                            ghost-class='ghost'
                            :move="handleMove">
                            <el-card class="widget-item" v-for="item in basicElem" :key="item.id" shadow="hover" :body-style="CardBodyStyle">
                                <i :class="item.icon"></i>{{item.name}}</el-card>
                        </draggable>
                    </div>
                </el-aside>
                <el-container class="area-work">
                    <div>
                        <div class="content">
                            <widget-form :data="form" :select.sync="selectFormItem"></widget-form>
                        </div>
                    </div>
                </el-container>
                <el-aside class="area-right">
                    <el-header height="40px">
                        <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
                        <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
                    </el-header>
                    <el-main class="config-content">
                        <widget-config v-show="configTab==='widget'" :data="selectFormItem"></widget-config>
                        <form-config v-show="configTab=='form'" :data="form.config"></form-config>
                    </el-main>
                </el-aside>
            </el-container>
            <el-dialog title="提示" :visible.sync="dialogVisible">
                <GenerateForm v-if="dialogVisible" :data="form" :value="widgetModels" ref="generateForm"></GenerateForm>
                <span slot="footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="handleTest">获取数据</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="jsonVisible">
                <!-- <span v-html="test"></span> -->
                <span>{{test}}</span>
                <span slot="footer">
                    <el-button @click="jsonVisible = false">取 消</el-button>
                    <el-button type="primary" @click="jsonVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </Container>
</template>

<script>
import draggable from 'vuedraggable'
import widgetForm from './WidgetForm'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import GenerateForm from '../preview/GenerateForm'
import { basicElem } from '../../config/formItem'
export default {
    name: 'WorkBench',
    components: {
        draggable,
        widgetForm,
        WidgetConfig,
        FormConfig,
        GenerateForm
    },
    data () {
        return {
            basicElem,
            configTab: 'widget',
            selectFormItem: null,
            form: {
                list: [],
                config: {
                    labelWidth: 100,
                    labelPosition: 'right',
                    size: 'small'
                }
            },
            CardBodyStyle: {
                padding: '8px 5px'
            },
            imglist: [{ name: 'test.jpg', url: 'http://test1.img.9now.net/te11002/application/20190806/160204_901d372c10.png' }],
            previewVisible: false,
            dialogVisible: false,
            jsonVisible: false,
            widgetModels: {},
            test: {}

        }
    },
    methods: {
        handleConfigSelect (value) {
            console.log(this.selectFormItem)
            this.configTab = value
        },
        handleMove () {
            return true
        },
        handlePreview () {
            console.log(this.form)
            this.dialogVisible = true
        },
        handleTest () {
            this.$refs.generateForm.getData().then(data => {
                this.$alert(data, '').catch(e => {})
                // this.$refs.widgetPreview.end()
            }).catch(e => {
                // this.$refs.widgetPreview.end()
            })
        },
        handlePreviewJson () {
            this.jsonVisible = true
            this.test = JSON.stringify(this.form, null, 4)
            console.log(JSON.stringify(this.form, null, 4))
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    padding: 10px;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid #e6e6e6;
    .title {
        float: left;
    }
    .btn-grop {
        text-align: right;
    }
}
.container {
    height: 100%;
}
.area-left {
    padding: 10px;
    height: 100%;
    border-right: 1px solid #e6e6e6;
    // .ghost {
    //     background: #F56C6C;
    //     border: 2px solid #F56C6C;
    //     outline-width: 0;
    //     height: 3px;
    //     box-sizing: border-box;
    //     font-size: 0;
    //     content: '';
    //     overflow: hidden;
    //     padding: 0;
    // }
    .widget-category {
        font-size: 14px;
        padding: 0 5px 8px;
    }
    .widget-list {
        font-size: 12px;
        &:after{
            clear: both;
            display: block;
            content: " ";
        }
        .widget-item {
            float: left;
            width: 47%;
            margin: 1%;
            cursor: move;
            background: #F4F6FC;
            i {
                text-indent: .5em;
                padding-right: 5px;
            }
            &:hover {
                border: 1px dashed #409EFF;
                color: #409EFF;
            }
        }
    }
}
.area-work {
    overflow: scroll;
    background-color: #f4f4f4;
    padding: 10px;
    > div {
        width: 100%;
    }
    .content {
        width: 100%;
        min-height: 500px;
        background-color: #fff;
        border: 1px dashed #999;
    }
}
.area-right {
    border-left: 1px solid #e6e6e6;
    .el-header {
        padding: 0;
    }
    .config-tab {
        height: 40px;
        line-height: 40px;
        display: inline-block;
        width: 149px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        border-bottom: solid 2px #e6e6e6;
        &.active{
            border-bottom: solid 2px #409EFF;
        }
    }
    .config-content {
        height: calc(100% - 40px);
        overflow: scroll;
    }
}
</style>

<style lang="less">
.page-main {
    height: 100%;
    .page-container {
        height: calc(100% - 20px);
        .c-content {
            height: calc(100% - 41px);
        }
    }
}
</style>
