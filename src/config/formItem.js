
export const basicElem = [
    {
        type: 'input',
        name: '单行文本',
        icon: 'el-icon-notebook-1',
        options: {
            width: '100%',
            defaultValue: '',
            required: false,
            // pattern: '',
            placeholder: '',
            disabled: false
        }
    },
    {
        type: 'textarea',
        name: '多行文本',
        icon: 'el-icon-notebook-2',
        options: {
            width: '100%',
            defaultValue: '',
            required: false,
            disabled: false,
            // pattern: '',
            placeholder: ''
        }
    },
    {
        type: 'number',
        name: '计数器',
        icon: 'el-icon-c-scale-to-original',
        options: {
            width: '',
            required: false,
            defaultValue: 0,
            // min: '',
            // max: '',
            step: 1,
            disabled: false
            // controlsPosition: ''
        }
    },
    {
        type: 'radio',
        name: '单选框组',
        icon: 'el-icon-open',
        options: {
            inline: false,
            defaultValue: '',
            showLabel: false,
            options: [
                {
                    value: '选项1',
                    label: '选项1'
                },
                {
                    value: '选项2',
                    label: '选项2'
                },
                {
                    value: '选项3',
                    label: '选项3'
                }
            ],
            required: false,
            width: '',
            remote: true, // 选项是否从后端请求
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false
        }
    },
    {
        type: 'checkbox',
        name: '多选框组',
        icon: 'el-icon-set-up',
        options: {
            inline: false,
            defaultValue: [],
            showLabel: false,
            options: [
                {
                    value: '选项1'
                },
                {
                    value: '选项2'
                },
                {
                    value: '选项3'
                }
            ],
            required: false,
            width: '',
            remote: true,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false
        }
    },
    {
        type: 'date',
        name: '日期时间',
        icon: 'el-icon-date',
        options: {
            width: '',
            defaultValue: '',
            // readonly: false,
            disabled: false,
            // editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            type: 'date',
            format: 'yyyy-MM-dd',
            timestamp: false,
            required: false
        }
    },
    {
        type: 'select',
        name: '下拉选择框',
        icon: 'el-icon-arrow-down',
        options: {
            defaultValue: '',
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: false,
            width: '',
            options: [
                {
                    value: '下拉框1'
                },
                {
                    value: '下拉框2'
                },
                {
                    value: '下拉框3'
                }
            ],
            remote: true,
            filterable: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: ''
        }
    }
]
