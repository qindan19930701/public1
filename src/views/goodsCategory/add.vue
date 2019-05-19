<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="formData">
      <el-form-item label="分类名称" label-width="70px">
        <el-input v-model="formData.cat_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级分类" label-width="70px">
        <el-cascader
         :options="goodsCategories"
         v-model="formData.cat_pid"
         change-on-select
         clearable
         :props="{ value: 'cat_id', label: 'cat_name', children: 'children' }"></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getGoodsCategoryList, addGoodsCategory } from '@/api/goods-category'

export default {
  name: 'GoodsCategoryAdd',
  data () {
    return {
      dialogFormVisible: false,
      formData: {
        cat_name: '',
        cat_level: '',
        cat_pid: []
      },
      goodsCategories: []
    }
  },

  created () {
    this.loadGoodCategories()
  },

  methods: {
    show () {
      this.dialogFormVisible = true
    },
    async loadGoodCategories () {
      const { data, meta } = await getGoodsCategoryList(2) // 只需要2级分类列表
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },

    async handleSubmit () {
      const { cat_name, cat_pid } = this.formData
      const { meta } = await addGoodsCategory({
        cat_name,
        cat_pid: cat_pid[cat_pid.length - 1],
        cat_level: cat_pid.length
      })
      if (meta.status === 201) {
        this.$emit('add-success')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.dialogFormVisible = false // 隐藏对话框
      }
    }
  }
}
</script>

<style>

</style>
