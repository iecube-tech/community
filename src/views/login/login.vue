<template>
    <div class="main">
        <el-card class="login">
            <el-row style="text-align: left">
                <a href="/"><img class="logo" src="@/assets/images/产业案例教学资源库和过程评价系统LOGO.svg" alt=""></a>
            </el-row>
            <el-row style="margin-top: 45px;">
                <h2>登 录</h2>
            </el-row>
            <el-form class="logform" ref="formRef" status-icon :model="loginfo" :rules="loginRules">
                <el-row class="input" style="text-align: left;">
                    <h4>您的账户:</h4>
                </el-row>
                <el-row style="margin-top: 8px;" class="input">
                    <el-form-item prop="username">
                        <el-input prefix-icon="User" placeholder="请输入您的邮箱账号" v-model="loginfo.username"
                            oninput="value=value.replace(/[^\d]/g,'')" maxlength="11">
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row class="input" style="margin-top: 50px; text-align: left;">
                    <h4>您账户的密码:</h4>
                </el-row>
                <el-row style="margin-top: 8px;" class="input">
                    <el-form-item prop="password">
                        <el-input type="password" show-password prefix-icon="Lock" placeholder="请输入密码,区分大小写"
                            v-model="loginfo.password" @keyup.enter="submitForm(loginfo)"></el-input>
                    </el-form-item>
                </el-row>
                <el-row class="input" style="text-align: left;">
                    <el-form-item prop="clause">
                        <el-checkbox name="clause" v-model="loginfo.clause"></el-checkbox>
                        <span style="">我已阅读并同意
                            <a style="color:#409EFF" href="">服务协议</a>
                            和
                            <a style="color:#409EFF" href="">隐私政策</a>
                        </span>
                    </el-form-item>
                </el-row>
                <el-row style="margin-top: 60px; ">
                    <el-button @click="submitForm(loginfo)"
                        style="height: 50px; width: 310px; background-color: #33b8b9; color: white;">
                        <h2>登 录</h2>
                    </el-button>
                </el-row>
                <el-row style="margin-top: 20px;">
                    <a style="color:#409EFF" href="/forget">忘记密码?</a>
                </el-row>
            </el-form>

        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Login } from '@/apis/login'
import router from '@/router';

const formRef = ref<FormInstance>()
const loginfo = reactive({
    username: '',
    password: '',
    clause: false
})

const loginRules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入邮箱账号', trigger: 'blur' },
        {
            validator: function (rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) == false) {
                    callback(new Error("请输入正确的手机号"));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        },
    ],
    // [
    //     { required: true, message: '请输入邮箱账号', trigger: 'blur' },
    //     {
    //         validator: function (rule, value, callback) {
    //             const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //             // if (/^1[34578]\d{9}$/.test(value) == false) {
    //             if (regEmail.test(value) == false) {
    //                 callback(new Error("请输入正确的邮箱号"));
    //             } else {
    //                 callback();
    //             }
    //         }, trigger: 'blur'
    //     },
    // ],
    password: [
        { required: true, min: 6, max: 16, message: 'Length should be 8 to 16', trigger: 'blur' }
    ],
    clause: [
        {
            required: true,
            validator: function (rule, value, callback) {
                if (value != true) {
                    callback(new Error('请同意服务协议和隐私条款'));
                } else {
                    callback()
                }
            }, trigger: 'change'
        }
    ]
})

const submitForm = (loginfo) => {

    Login(loginfo).then(res => {
        console.log(res)
        if (res.state == 200) {
            router.push("/")
        } else {
            console.log(res.message);
        }
    })
}
</script>
<style>
.el-row {
    display: block;
    text-align: center;
}

.input {
    padding-left: 55px;
    width: 400px;
}

.logform {
    margin-top: 40px;
}

.logo {
    width: 200px;
}

.login {
    /* margin: auto; */
    width: 500px;
    height: 600px;
    /* 垂直居中对齐的方式 */
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}

.main {
    /* background-color: #33b8b9; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>