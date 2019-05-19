<template>
  <div>
   <el-row :gutter="20">
    <el-col :span="6">
      <el-input placeholder="请输入内容" class="input-with-select"
       v-model="searchText">
        <el-button
        slot="append"
        icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addFormVisible = true">测试订单</el-button>
    </el-col>
   </el-row>
   <el-table
    border
    :data="goods"
    stripe
    style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="220">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="下单用户"
        width="100">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款"
        width="100">
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="100">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间"
        width="120">
      </el-table-column>
      <!-- 自定义表格列
          自定义内容写到 <template slot-scope="scope"></template> 里面
          scope.row 就是遍历的数组元素
          scope.$index 就是遍历的索引-->
        <el-table-column label="操作">
          <template>
            <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="$refs.orderEditEl.formVisible = true">订单编辑</el-button>
            <el-button type="danger" icon="el-icon-location-outline" size="mini"
            >物流信息</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      :page-size="10"
      layout="prev, pager, next"
      :total="ordersTotal"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 订单编辑组件 -->
    <OrderEdit ref="orderEditEl"></OrderEdit>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order.js'
import OrderEdit from './order-edit'

export default {
  name: 'ordersList',
  components: {
    OrderEdit
  },
  data () {
    return {
      ordersTotal: 0,
      searchText: '',
      goods: []
    }
  },
  created () {
    this.loadOrder()
  },
  methods: {
    // 加载订单列表
    async loadOrder (page = 1) {
      const { data, meta } = await getOrderList({ pagenum: page, pagesize: 10, query: this.searchText })
      if (meta.status === 200) {
        this.goods = data.goods
        this.ordersTotal = data.total
      }
    },
    handleCurrentChange (page) {
      // console.log(page)
      this.loadOrder(page)
    }
  }
}
</script>

<style>

</style>
