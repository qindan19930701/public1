// 订单管理相关接口处理
import request from '@/utils/request'

// 获取订单列表
export const getOrderList = ({ pagenum = 1, pagesize = 10, query = '' }) => request({
  method: 'get',
  url: '/orders',
  params: {
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)
