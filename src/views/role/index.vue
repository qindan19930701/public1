<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button type="primary" @click="showAdd">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 角色列表 -->
    <el-table
      border
      :data="roles"
      stripe
      style="width: 100%">
      <!-- 可以展开的列表 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row class="first"
          v-for="first in scope.row.childrens"
          :key="first.authName">
            <el-col :span="4">
              <!-- 一级 -->
              <el-tag
              closable
              @close="handleDeleteRights(scope.row, first)">
              {{ first.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 二级 -->
              <el-row
              class="second" v-for="second in first.children"
              :key="second.id">
                <el-col :span="4">
                  <el-tag closable
                  type="success"
                  @close="handleDeleteRights(scope.row, second)">
                  {{ second.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级 -->
                <el-col :span="20">
                  <el-tag closable
                  type="warning"
                  v-for="third in second.children"
                  :key="third.id"
                  @close="handleDeleteRights(scope.row, third)">
                  {{ third.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          width="300">
        </el-table-column>
        <!-- 自定义表格列
            自定义内容写到 <template slot-scope="scope"></template> 里面
            scope.row 就是遍历的数组元素
            scope.$index 就是遍历的索引-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
            @click="$refs.EditRoleEl.showEditDialog(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"
            @click="handleDeleteRole(scope.row)">删除</el-button>
            <el-button
            type="success"
            @click="showEditRights(scope.row)"
            icon="el-icon-check"
            size="mini">角色授权</el-button>
          </template>
        </el-table-column>
      </el-table>
   <!-- 添加角色组件 -->
   <RoleAdd ref="roleAddEl" @add-success="loadRoles"></RoleAdd>

   <!-- 编辑角色权限组件 -->
   <RoleEditRights
   ref="roleEditRightsEl"
   @edit-rights-success="loadRoles()"></RoleEditRights>

   <!-- 编辑角色组件 -->
   <EditRole ref="EditRoleEl" @edit-success="loadRoles"></EditRole>
  </div>
</template>

<script>
import { getRoleList, deleteRightsByRoleId, deleteRole } from '@/api/role'
import RoleAdd from './add'
import RoleEditRights from './edit-rights'
import EditRole from './edit-role'

export default {
  name: 'RoleList',
  components: {
    RoleAdd,
    RoleEditRights,
    EditRole
  },
  data () {
    return {
      roles: []
    }
  },
  async created () {
    this.loadRoles()
  },

  methods: {
    // 加载角色列表数据
    async loadRoles () {
      const { data, meta } = await getRoleList()
      if (meta.status === 200) {
        data.forEach(item => {
          item.childrens = item.children
          delete item.children
        })
        this.roles = data
      }
    },

    // 删除角色
    handleDeleteRole (item) {
      this.$confirm('确定删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 确认取消
        const { meta } = await deleteRole(item.id)
        console.log(meta)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        this.loadRoles()
      }).catch(() => { // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    showAdd () {
      this.$refs.roleAddEl.show()
    },

    showEditRights (role) {
      this.$refs.roleEditRightsEl.show(role)
    },

    // 删除角色权限
    async handleDeleteRights (role, right) {
      const { data, meta } = await deleteRightsByRoleId(role.id, right.id)
      if (meta.status === 200) {
        // 将服务端返回的最新角色权限列表重新赋值给当前角色
        role.children = data
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  height:100%;
}
.el-table{
  margin-top:20px;
}
.first, .second, .third{
  margin-bottom: 10px;
}
.third {
  margin-right:5px;
}

</style>
