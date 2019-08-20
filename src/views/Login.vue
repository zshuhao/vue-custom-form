<template>
<div class="login-page-container">
    <el-form :model="usermessage" :rules="rules2" ref="userForm" label-position="left" label-width="0px" class="demo-ruleForm login-container" @submit.native.prevent>
        <h3 class="title">用户登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="usermessage.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="usermessage.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" native-type="submit" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            logining: false,
            usermessage: {
                username: '',
                password: '',
                grant_type: 'password'
            },
            rules2: {
                username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            checked: true
        }
    },
    mounted () {
        let user = this.$store.state.rememberMe
        this.usermessage = { ...user }
    },
    methods: {
        handleSubmit (ev) {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.logining = true
                    let tokenStr = `username=${this.usermessage.username}&grant_type=${this.usermessage.grant_type}&password=${this.usermessage.password}`
                    this.$ajax({
                        type: 'accessToken',
                        data: tokenStr,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST'
                    }).then(res => {
                        if (res.status === 200) {
                            let accessToken = {
                                token: res.data.data.access_token,
                                expired: Date.now() + 7 * 24 * 3600 * 1000
                            }
                            this.$store.commit('ACCESSTOKEN', accessToken)
                            if (this.checked) {
                                this.$store.commit('REMEMBERME', this.usermessage)
                            } else {
                                let user = {
                                    username: '',
                                    password: '',
                                    grant_type: 'password'
                                }
                                this.$store.commit('REMEMBERME', user)
                            }
                            this.getPermisson()
                        }
                        if (typeof res !== 'undefined') {
                            this.$massage.error = '请检查账号密码是否正确，网络连接是否正常'
                        }
                        this.logining = false
                    }).catch(err => {
                        console.log(err)
                        if (err) {
                            this.logining = false
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        getPermisson () { // 获取用户信息
            this.$ajax({
                type: 'userPermission',
                method: 'GET'
            }).then(res => {
                if (res.data.success && res.data.data) {
                    this.$store.commit('USERINFO', res.data.data)
                    this.$router.push({ path: '/' })
                }
            })
        }
    }
}
</script>

<style scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 450px;
    padding: 25px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

label.el-checkbox.remember {
    margin: 0px 0px 35px 0px;
}
.title{
    padding: 10px 0 15px 0;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
}
</style>
