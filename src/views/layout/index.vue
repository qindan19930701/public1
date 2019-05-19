<template>
  <el-container>
    <el-header>
      <AppHeader></AppHeader>
    </el-header>
    <el-container>
      <el-aside width="230px">
         <NavMenu></NavMenu>
      </el-aside>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <AppBreadcrumb
              :list="[{ label: '首页', path: '/'}, { label: '用户管理'}, { label: '用户列表'}]">
            </AppBreadcrumb> -->
            <AppBreadcrumb :list="getBreadcrumbs()"></AppBreadcrumb>
          </div>
        <!-- layout的子路由将被渲染到这里 -->
        <router-view></router-view>
       </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './header'
import NavMenu from './navmenu'
export default {
  name: 'layout',
  data () {
    return {}
  },

  created () {
    // 一个数组，包含当前路由的所有嵌套路径片段的路由记录
    console.log('this.$route.matched =>', this.$route.matched)
  },

  methods: {
    getBreadcrumbs () {
      const breads = [{ label: '首页', path: '/' }]
      this.$route.matched.slice(1).forEach(route => {
        breads.push({
          label: route.meta.label
        })
      })
      return breads
    }
  },
  components: {
    AppHeader,
    NavMenu
  }
}
</script>

<style>
  .el-container{
      height:100%;
  }
  .el-header{
      background-color:#b3c0d1;
  }
  .el-aside{
      background-color:#545c64;
  }
  .el-main{
      background-color: #e9eef3;
  }
  .el-row {
    display: flex;
    align-items: center;
  }
  .text{
    margin-left:300px;
    font-size:26px;
    font-weight: 700;
  }
  a{
    text-decoration: none;
    color:black;
  }
  .el-table{
    min-height:100%;
  }

</style>
