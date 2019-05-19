<template>
  <div class="goods-category-wrap">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="showAdd">添加分类</el-button>
      </el-col>
    </el-row>
    <!-- row-key 行的唯一标识
         你得告诉他 在你的数据中哪个字段有唯一标识 -->
     <el-table
      :data="goodsCategories"
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="cat_id">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180">
         <template slot-scope="scope">
           {{ scope.row.cat_deleted ? '有效' : '无效' }}
         </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          {{ ['一级', '二级', '三级',][scope.row.cat_level] }}
        </template>
      </el-table-column>
      <el-table-column label=操作>
        <template slot-scope="scope">
          <el-button size="mini">删除</el-button>
          <el-button size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @current-change="loadGoodsCategories"
      :page-size="10"
      background
      layout="total, prev, pager, next, jumper"
      :total="categoryTotal">
    </el-pagination>
    <!-- 添加分类 -->
    <CategoryAdd ref="categoryAddEl" @add-success="loadGoodsCategories"></CategoryAdd>
  </div>
</template>

<script>
import { getGoodsCategoryList } from '@/api/goods-category'
import CategoryAdd from './add'

export default {
  name: 'GoodsCategory',
  components: {
    CategoryAdd
  },
  data () {
    return {
      categoryTotal: 0,
      goodsCategories: []
    }
  },
  created () {
    this.loadGoodsCategories()
  },
  methods: {
    // 加载商品分类列表
    async loadGoodsCategories (page = 1) {
      const { data, meta } = await getGoodsCategoryList({ pagenum: page, pagesize: 10 })
      if (meta.status === 200) {
        this.goodsCategories = data
        // this.goodsCategoryTotal = data.data.length
      }
    },
    // 显示添加分类的弹框
    showAdd () {
      this.$refs.categoryAddEl.show()
    }
  }
}
</script>

<style>

</style>
