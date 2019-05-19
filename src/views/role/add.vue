<template>
<el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="30%">
  <el-form :model="form" :rules="addFormRules">
    <el-form-item label="角色名称" label-width="80px" prop="roleName">
      <el-input v-model="form.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
      <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button
    type="primary"
    @click.prevent="handleSubmit">确 定
    </el-button>
  </div>
</el-dialog>
</template>

<script>
import { addRole } from '@/api/role'

export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show () {
      this.dialogFormVisible = true
    },

    async handleSubmit () {
      const { roleName, roleDesc } = this.form
      const { data, meta } = await addRole({ roleName, roleDesc })
      console.log(data)
      if (meta.status === 201) {
        // 隐藏对话框
        this.dialogFormVisible = false
        this.$emit('add-success')
      }
    }
  }
}
</script>

<style>

</style>
