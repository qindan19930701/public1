<template>
   <div class="login-wrap">
    <div class="login-container">
      <!-- el-form 是包装的表单元素
      label-position 用来设定对齐方式
      :rules=loginFormRules 配置验证规则
      ref=loginFormEl  引用获取表单元素
      prop=name 必须显示的将被验证的数据字段通过prop属性配置
      -->
      <el-form
      :rules="loginFormRules"
      label-position="right"
      label-width="80px"
      :model="loginForm"
      ref="loginFormEl">
        <!-- <h1>登录页面</h1> -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/index.js'
// import request from '@/utils/request.js'
import { setToken } from '@/utils/auth.js'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', tigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', tigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    async handleLogin () {
      this.$refs.loginFormEl.validate(valid => {
        if (valid) { // 如果表单验证通过，则进行登录
          this.login()
        } else {
          return false
        }
      })
    },

    async login () {
      // const loginForm = this.loginForm
      // const { data, meta } = (await request.post('/login', loginForm)).data
      const { data, meta } = await login(this.loginForm)
      if (meta.status === 200) {
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 将受到的用户身份令牌放到本地存储中
        // window.localStorage.setItem('token', data.token)
        setToken(data.token)
        // this.$router.replace('/')
        const redirectUrl = this.$route.query.redirect || '/'
        // console.log(redirectUrl)
        this.$router.replace(redirectUrl)
      } else {
        this.$message.error(`登录失败:${meta.msg}`)
      }
    }
  }
}
</script>

<style scoped>
  .login-wrap{
    height:100%;
    background-color:#2f4050;
    display:flex;
    justify-content:center;
    align-items: center;
  }

  .login-container{
    width:300px;
    height: 200px;
    background:#fff;
    border-radius:10px;
    padding:50px;
  }

  .login-btn{
    width:100%;
  }
</style>
