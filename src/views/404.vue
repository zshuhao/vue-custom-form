<template>
    <div class="nopage">
        <div class="image"></div>
    </div>
</template>

<script>
export default {
    name: 'NoPage'
}
</script>

<style lang="less" scoped>
.nopage {
    height: 100%;
    background-color: #fff;
    border-radius: 4px;
    .image {
        margin: 0 auto;
        width: 70%;
        height: 70%;
        background-image: url('../assets/nopage.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size:  contain;
    }
}
</style>
