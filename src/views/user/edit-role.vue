<template>
<el-dialog title="分配角色" :visible.sync="formVisible" width="30%">
  <el-form :model="formData" size="small" ref="addFormEl">
    <el-form-item label="用户名" label-width="70px" >
      <el-input v-model="formData.username" autocomplete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="角色" label-width="70px">
      <el-select v-model="formData.rid" placeholder="请选择">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.roleName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="formVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { findUserById, changeRole } from '@/api/user'
import { getRoleList } from '@/api/role'

export default {
  data () {
    return {
      formVisible: false,
      formData: {
        username: ''
      },
      roles: []
    }
  },
  methods: {
    // 分配完成，处理提交状态
    async handleSubmit () {
      const { id: userId, rid: roleId } = this.formData
      const { meta } = await changeRole(userId, roleId)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '分配角色成功'
        })
        this.formVisible = false
      }
    },

    // 显示分配角色的弹框
    async showEditRoleDialog (item) {
      // 发请求，拿数据
      // const { data, meta } = await findUserById(item.id)
      // if (meta.status === 200) {
      //   // 更新 formdata，显示弹框
      //   this.formData = data
      //   this.formVisible = true
      // }
      const [ userData, roleData ] = await Promise.all([
        findUserById(item.id),
        getRoleList()
      ])
      if (userData.meta.status === 200) {
        this.formData = userData.data
        this.formVisible = true
      }

      // 获得角色列表
      // const { data: roleData, meta: roleMeta } = await getRoleList()
      // if (roleMeta.status === 200) {
      //   this.roles = roleData
      // }
      if (roleData.meta.status === 200) {
        this.roles = roleData.data
      }
    }
  }

}
</script>

<style>

</style>
