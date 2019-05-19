<template>
<el-dialog title="编辑用户" :visible.sync="formVisible" width="30%">
  <el-form :model="formData" size="small" ref="addFormEl" :rules="formRules">
    <el-form-item label="用户名" label-width="70px" prop="username">
      <el-input v-model="formData.username" autocomplete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="70px" prop="email">
      <el-input v-model="formData.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="70px" prop="mobile">
      <el-input v-model="formData.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="formVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleEdit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { findUserById, updateById } from '@/api/user.js'

export default {
  data () {
    return {
      formVisible: false,
      formData: {
        username: '',
        email: '',
        mobile: ''
      },
      formRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleEdit () {
      const { id, email, mobile } = this.formData
      const { meta } = await updateById(id, {
        email,
        mobile
      })
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑用户成功'
        })
        /**
         * 发布一个自定义事件
         * 编辑成功的时候，对外发布了一个自定义事件
         * 使用者可以自行决定这个事件发生以后要做的事
         */
        this.$emit('edit-success')
        this.formVisible = false
      }
    },
    async showEditDialog (item) {
      // 发请求，拿数据
      const { data, meta } = await findUserById(item.id)
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
