<template>
<div>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button
        slot="append"
        icon="el-icon-search"
        @click="loadUsers(1)"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
    </el-col>
  </el-row>
  <!-- 表格组件
       data 表格数据，需要给一个数组
       border 带边框
       style 表格样式
       el-table-column 表格列组件
       prop 列数据
       label 列标题
       width 列宽
       表格会自动使用数据去遍历
       v-loading 是 element-ui 提供的自定义全局指定-->
  <el-table
   v-loading="tableLoading"
   border
   :data="users"
   stripe
   style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="200">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="200">
    </el-table-column>
    <!-- 自定义表格列
        自定义内容写到 <template slot-scope="scope"></template> 里面
        scope.row 就是遍历的数组元素
        scope.$index 就是遍历的索引-->
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="handleSwitchState(scope.row)"
            :disabled="scope.row.stateDisabled"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
          @click="$refs.userEditEl.showEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"
          @click="handleDelete(scope.row)">删除</el-button>
          <el-button
          type="success"
          @click="$refs.userEditRoleEl.showEditRoleDialog(scope.row)"
          icon="el-icon-check"
          size="mini">分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>
 <!-- 分页组件
      background 背景色
      layout 设置分页结构
      total 总数据条数
      默认按照每页10条进行分页-->
  <el-pagination
    background
    :page-size="5"
    layout="prev, pager, next"
    :total="userTotal"
    @current-change="loadUsers">
  </el-pagination>

 <!-- 添加对话框
      title 对话框标题
      visible 对话框可见性 -->
 <el-dialog title="添加用户" :visible.sync="addFormVisible" width="30%">
  <el-form :model="addFormData" size="small" :rules="addFormRules" ref="addFormEl">
    <el-form-item label="用户名" label-width="70px" prop="username">
      <el-input v-model="addFormData.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="70px" prop="password">
      <el-input v-model="addFormData.password" autocomplete="off" type="password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="70px" prop="email">
      <el-input v-model="addFormData.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="70px" prop="mobile">
      <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleAdd" :disabled="addButtonDisabled">确 定</el-button>
  </div>
  </el-dialog>
  <!-- 编辑用户对话框
       给组件添加一个 ref 属性，就可以在当前组件中通过 this.$refs.ref名字，来访问这个组件-->
  <UserEdit ref="userEditEl"
   @edit-success="loadUsers"></UserEdit>

   <!-- 编辑用户角色组件 -->
   <UserEditRole ref="userEditRoleEl"></UserEditRole>
 </div>

</template>

<script>
// import request from '@/utils/request'
import * as User from '@/api/user.js'
import UserEdit from './edit.vue'
import UserEditRole from './edit-role.vue'

export default {
  name: 'user',
  async created () {
    // console.log('有token，进去具体页面中')
    // request({
    //   method: 'get',
    //   url: '/user',
    //   params: {
    //     pagenum: 1,
    //     pagesize: 5
    //   }
    // }).then(resData => {
    //   // 由于你配置了响应拦截器，则响应回来之后会先进入响应拦截器，完了再进入这里
    //   console.log('真正发请求的地方收到响应了', resData)
    // })
    // console.log(resData)
    // const { data, meta } = await findUserList({ pagenum: 1 })
    // console.log(data, meta)
    this.loadUsers()
  },
  data () {
    const checkUsername = (rule, value, callback) => {
      // 发请求，校验用户名是否已存在
      setTimeout(function () { // 请求验证用户名是否存在的接口
        const isExists = false
        if (isExists) {
          callback(new Error('用户名已存在'))
        } else {
          callback() // 验证通过
        }
      }, 1000)
    }
    return {
      userTotal: 0,
      searchText: '',
      users: [],
      addFormVisible: false,
      addFormData: {
        username: '',
        password: '',
        email: '',
        moblie: ''
      },
      // 验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkUsername, message: '用户名已存在', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '密码为 3 - 16 位长度', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },
      addButtonDisabled: false,
      tableLoading: true
    }
  },
  methods: {
    // 加载用户
    async loadUsers (page = 1) {
      // 每一次 loadUsers 调用就把上一次的给取消掉
      this.tableLoading = true
      // const { data, meta } = await findUserList({ pagenum: 1, pagesize: 100 })
      const { data, meta } = await User.find({ pagenum: page, pagesize: 5, query: this.searchText })
      if (meta.status === 200) {
        // 手动的往用户列表项中添加一个元素用来控制每一行的切换状态 switch 开关的可点状态
        data.users.forEach(item => {
          item.stateDisabled = false
        })
        this.users = data.users
        this.userTotal = data.total
        // 取消 loading 效果
        this.tableLoading = false
      }
    },

    // 会话框添加用户
    handleAdd () {
      this.$refs.addFormEl.validate(valid => {
        if (!valid) {
          return
        }
        // 禁用添加用户“确定”按钮
        this.addButtonDisabled = true
        this.submitAdd() // 表单验证通过，提交添加
      })
    },

    // 会话框提交表单数据
    async submitAdd () {
      const { meta, data } = await User.create(this.addFormData)
      console.log(data)
      if (meta.status === 201) {
        // 清空表单内容
        this.$refs.addFormEl.resetFields()
        // 隐藏对话框
        this.addFormVisible = false
        // 刷新数据列表
        this.loadUsers()
        this.$message({
          message: '用户添加成功',
          type: 'success'
        })
      } else if (meta.status === 400) {
        this.$message.error(`添加失败: ${meta.msg}`)
      }
      // 无论添加成功与失败，都启用添加用户“确定”按钮
      this.addButtonDisabled = false
    },

    // 删除用户
    handleDelete (item) {
      this.$confirm('确定删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 确认取消
        const { data, meta } = await User.deleteById(item.id)
        console.log(data)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        this.loadUsers()
      }).catch(() => { // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 处理开关状态
    async handleSwitchState (item) {
      // 切换状态请求期间禁用 switch 开关的可用状态
      item.stateDisabled = true
      const { data, meta } = await User.changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`,
          type: 'success'
        })
      }
      // 请求结束之后启用 switch 开关的可用状态
      item.stateDisabled = false
    }
  },
  components: {
    UserEdit,
    UserEditRole
  }
}
</script>

<style scoped>
.el-card{
  height:100%;
}
.el-table{
  margin-top:20px;
}
.el-pagination{
  margin-top:20px;
}

</style>
