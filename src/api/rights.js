/**
 * 权限相关接口处理模块
 */

import request from '@/utils/request'

// 获取权限列表
/**
 * type:
 *  list 列表格式
 *  tree 树格式
 */
export const getRightsList = (type = 'list') => request({
  method: 'get',
  url: `/rights/${type}`
}).then(res => res.data)

// 获取当前登录用户的权限列表
export const getRightsMenus = () => request({
  method: 'get',
  url: '/menus'
}).then(res => res.data)
