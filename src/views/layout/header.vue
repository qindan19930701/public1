<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <img src="./logo.png" alt="">
    </el-col>
    <el-col :span="16" class="text">电商后台管理系统</el-col>
    <el-col :span="4">
      <el-button type="primary" @click="handleLogout">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { removeToken } from '@/utils/auth.js'
export default {
  name: 'AppHeader',
  data () {
    return {}
  },
  methods: {
    // 处理退出功能
    handleLogout () {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认退出
        // 清除登录状态
        // window.localStorage.removeItem('token')
        removeToken()
        // 跳转到登录页面
        this.$router.replace('/login')
        this.$message({ // 确定退出
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => { // 取消退出
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style>

</style>
