// 商品分类参数相关 API

import request from '@/utils/request'

// 获取商品分类的参数
/**
 * sel
 *   only 获取商品属性
 *   many 获取商品参数
 */
export const getGoodsCategoryAttrList = (catId, sel = 'many') => request({
  method: 'get',
  url: `/categories/${catId}/attributes`,
  params: {
    sel
  }
}).then(res => res.data)
