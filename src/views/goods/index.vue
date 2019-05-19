<template>
<div class="goods-wrap">
  <!-- 操作选项 -->
  <el-row :gutter="20">
    <el-col :span="6">
      <el-input placeholder="请输入内容"
      class="input-with-select"
      v-model="searchText">
        <el-button
        slot="append"
        icon="el-icon-search"
        @click="loadGoods(1)"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary"
      @click="$router.push('/goods/toadd')">添加商品</el-button>
    </el-col>
  </el-row>
  <!-- 数据列表 -->
  <el-table
    border
    stripe
    :data="goods"
    style="width: 100%">
    <el-table-column type="index" label="编号" width="50"></el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="300">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goods_state"
      label="商品状态"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量"
      width="100">
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="120">
      <template slot-scope="scope">{{ scope.row.add_time | dateFormat('YYYY-MM-DD') }}</template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini"
        @click="handleEdit">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"
        @click="handleDelete(scope.row)">删除</el-button>
        <el-button
        type="success"
        icon="el-icon-check"
        size="mini">审核</el-button>
    </template>
  </el-table-column>
  </el-table>
  <!-- 分页部分 -->
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[10,20,30,40,50]"
    :total="goodsTotal"
    :page-size="pageSize"
    :current-page.sync="page"
    @current-change="loadGoods"
    @size-change="handleSizeChange">
  </el-pagination>
</div>
</template>

<script>
import { getGoodsList } from '@/api/goods'

export default {
  name: 'GoodsList',
  data () {
    return {
      goods: [],
      goodsTotal: 0,
      searchText: '',
      pageSize: 10,
      page: 1
    }
  },

  created () {
    this.loadGoods()
  },
  methods: {
    // 动态加载商品列表
    async loadGoods (pagenum = 1) {
      const { data, meta } = await getGoodsList({ pagenum, query: this.searchText, pagesize: this.pageSize })
      if (meta.status === 200) {
        this.goods = data.goods
        this.goodsTotal = data.total
      }
    },

    handleEdit () {},
    handleDelete () {},

    // 处理分页的改变
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      console.log(pageSize)
      // 让分页的视图页码回到第一页（和数据没有关系）
      this.page = 1
      // 让数据加载第一页
      this.loadGoods(1)
    }
  }
}
</script>

<style scoped>
.el-table{
  margin-top:15px;
}
.el-pagination{
  margin-top:10px;
}
</style>
