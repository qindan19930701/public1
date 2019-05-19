<template>
  <div>
    <el-table
      border
      :data="rights"
      style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column
          label="层级"
          width="180">
          <template slot-scope="scope">
            {{ ['一级', '二级', '三级'][scope.row.level] }}
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRightsList } from '@/api/rights'

export default {
  name: 'RightsList',
  data () {
    return {
      rights: []
    }
  },
  created () {
    this.loadRights()
  },
  methods: {
    async loadRights () {
      const { data, meta } = await getRightsList()
      if (meta.status) {
        this.rights = data
      }
    }
  }
}
</script>

<style>

</style>
