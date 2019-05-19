// 商品管理相关接口

import request from '@/utils/request'

// 获取商品列表
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 20 } = {}) => request({
  method: 'get',
  url: '/goods',
  params: {
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)

// 添加商品
// eslint-disable-next-line
export const addGoods = ({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce = '', pics = {}, attrs = [] }) => request({
  method: 'POST',
  url: '/goods',
  data: {
    goods_name, // 商品名称
    goods_cat, // 商品分类
    goods_price, // 商品价格
    goods_number, // 商品数量
    goods_weight, // 商品重量
    goods_introduce, // 商品介绍
    pics, // 商品图片
    attrs
  }
}).then(res => res.data)
