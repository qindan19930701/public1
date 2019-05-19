<template>
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  @open="handleOpen"
  @close="handleClose"
  :router="true"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-submenu
  v-for="first in rights"
  :key="first.id"
  :index="first.path">
    <template slot="title">
      <i class="fas fa-user-circle fa-lg"></i>
      <span>{{ first.authName }}</span>
    </template>
    <el-menu-item
    v-for="second in first.children"
    :key="second.id"
    :index="`/${first.path}/${second.path}`">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>{{ second.authName }}</span>
      </template>
    </el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
import { getRightsMenus } from '@/api/rights'

export default {
  name: 'NavMenu',
  data () {
    return {
      rights: []
    }
  },
  created () {
    this.loadRights()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    async loadRights () {
      const { data, meta } = await getRightsMenus()
      if (meta.status) {
        this.rights = data
      }
    }
  }

}
</script>

<style scoped>
.fas{
    margin-right:10px;
  }

</style>
