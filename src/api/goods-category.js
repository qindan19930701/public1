// 商品分类相关API

import request from '@/utils/request'

// 获取商品列表
export const getGoodsCategoryList = (type = 3) => request({
  method: 'get',
  url: '/categories',
  params: {
    type
  }
}).then(res => res.data)

// 添加商品分类
export const addGoodsCategory = ({ cat_pid = 0, cat_name, cat_level }) => request({
  method: 'post',
  url: '/categories',
  data: {
    cat_pid,
    cat_name,
    cat_level
  }
}).then(res => res.data)
