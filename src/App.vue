<template>
  <div class="app-wrap">
    <!-- login 登录组件
         layout 组件
         首页组件
         用户列表
    首页组件-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.app-wrap {
  height: 100%;
}
</style>
