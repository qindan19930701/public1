<template>
<el-dialog title="角色授权" :visible.sync="dialogFormVisible" width="40%">
  <!-- 树组件
       data 数据，需要有父子关系，都有label展示的文本和id节点的唯一值
       show-checkbox 是否显示复选框
       node-key 用来指定数据中的哪个字段是唯一值
       default-expanded-keys 默认展开的节点
       default-checked-keys 默认选中的节点
       :default-expanded-keys="[2, 3]"
       :default-checked-keys="[5]"-->
  <el-tree
    :data="rights"
    show-checkbox
    default-expand-all
    ref="tree"
    node-key="id"
    :default-checked-keys="defaultChecked"
    :props="defaultProps">
  </el-tree>
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
import { getRightsList } from '@/api/rights'
import { updateRoleRights } from '@/api/role'

export default {
  name: 'RoleEditRights',
  data () {
    return {
      rights: [],
      role: {},
      defaultChecked: [],
      defaultProps: {
        children: 'children', // 告诉 tree 数据中的字段名为 children 的是子节点数组
        label: 'authName' // 告诉 tree 数组中的字段名为label 的是节点的文本
      },
      dialogFormVisible: false
    }
  },
  methods: {
    show (role) {
      this.role = role
      this.loadRights()
      this.getRights(role.children)
      this.dialogFormVisible = true
    },

    // 展示所有的权限节点
    getRights (roleRights) {
      const everyRights = []
      roleRights.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            everyRights.push(third.id)
          })
        })
      })
      this.defaultChecked = everyRights
    },

    // 获取角色列表
    async loadRights () {
      const { data, meta } = await getRightsList('tree')
      // console.log(meta)
      // console.log(data)
      if (meta.status === 200) {
        this.rights = data
      }
    },

    // 角色列表授权提交
    async handleSubmit () {
      // console.log(this.$refs.tree.getCheckedNodes())
      const treeEl = this.$refs.tree
      const rids = [...treeEl.getCheckedKeys(), ...treeEl.getHalfCheckedKeys()].join(',')
      console.log(rids)
      // const { meta, data } = await updateRoleRights(this.role.id, rids)
      const { meta, data } = await updateRoleRights(this.role.id, rids)
      console.log(data)
      console.log(meta)
      if (meta.status === 200) {
        // 对外通知授权成功
        this.$emit('edit-rights-success')
        // 关闭授权对话框
        this.dialogFormVisible = false
      }
    }
  }

}
</script>

<style>

</style>
