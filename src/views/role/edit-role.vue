<template>
  <el-dialog title="编辑角色" :visible.sync="formVisible" width="30%">
    <el-form :model="formData" size="small" ref="addFormEl">
      <el-form-item label="角色名称" label-width="70px" prop="roleName">
        <el-input v-model="formData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="70px" prop="roleDesc">
        <el-input v-model="formData.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editRole, findRoleById } from '@/api/role'

export default {
  data () {
    return {
      formVisible: false,
      formData: {
        roleName: '',
        roleDesc: ''
      }
    }
  },

  methods: {
    // 提交编辑的表单数据
    async handleEdit () {
      const { roleId, roleName, roleDesc } = this.formData
      const { meta } = await editRole(roleId, {
        roleName,
        roleDesc
      })
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑角色成功'
        })
        this.$emit('edit-success')
        this.formVisible = false
      }
    },

    // 显示编辑角色对话框
    async showEditDialog (role) {
      // 发请求，拿数据
      const { data, meta } = await findRoleById(role.id)
      if (meta.status === 200) {
        // 更新 formData，显示弹框
        this.formData = data
        this.formVisible = true
      }
    }
  }
}
</script>

<style>

</style>
