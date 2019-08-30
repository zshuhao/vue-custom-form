<template>
    <div class="page-main">
        <div class="page-container">
            <div :class="{ 'c-header': true, 'page-header': !noDefaultStyle, 'noBorder': noHeaderBorder }">
                <slot name="header"></slot>
            </div>
            <div :class="{ 'c-content': true, 'page-content': !noDefaultStyle }">
                <slot name="content"></slot>
            </div>
            <div :class="{ 'c-footer': true, 'page-footer': !noDefaultStyle, 'noBorder': noFooterBorder }">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Container',
    props: {
        noDefaultStyle: {
            type: Boolean,
            default: false
        },
        noHeaderBorder: {
            type: Boolean,
            default: false
        },
        noFooterBorder: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="less" scoped>
.page-main {
    .page-title {
        padding-bottom: 15px;
        font-size: 24px;
        font-weight: 500;
        font-family: 'Source Sans Pro',sans-serif;
        >i {
            padding-left: 4px;
            font-size: 15px;
            font-weight: 300;
        }
    }
    .page-container {
        padding: 10px;
        border-radius: 3px;
        background: #ffffff;
        // border-top: 3px solid #d2d6de;
        margin-bottom: 20px;
        // box-shadow: 0 1px 1px rgba(0,0,0,0.1);
        .page-header {
            padding: 10px;
            border-bottom: 1px solid #f4f4f4;
        }
        .page-content {
            padding: 10px;
        }
        .page-footer {
            padding: 10px;
            border-top: 1px solid #f4f4f4;
        }
        .noBorder {
            border: none;
        }
    }
}
</style>
