/**
 * 用户相关接口处理模块
 */
import request from '@/utils/request'
import { CancelToken } from 'axios'
let calcelFind = function () {}

// 获取用户列表
// export const find = ({ pagenum = 1, pagesize = 5, query = '' }) => request({
//   method: 'get',
//   url: '/users',
//   params: { // get参数
//     pagenum,
//     pagesize,
//     query
//   }
// }).then(res => res.data)
export const find = ({ pagenum = 1, pagesize = 5, query = '' }) => {
  // 一上来就把之前的请求取消掉
  calcelFind()
  return request({
    method: 'get',
    url: '/users',
    params: {
      pagenum,
      pagesize,
      query
    },
    CancelToken: new CancelToken(function executor (c) {
      calcelFind = c
    })
  }).then(res => res.data)
}

// 添加用户
export const create = ({ username, password, email, mobile }) => request({
  method: 'post',
  url: '/users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => res.data)

// 根据 id 删除用户
export const deleteById = (userId) => request({
  method: 'delete',
  url: `/users/${userId}`
}).then(res => res.data)

// 根据id查询单个用户
export const findUserById = userId => request({
  method: 'get',
  url: `/users/${userId}`
}).then(res => res.data)

// 编辑用户
export const updateById = (id, data) => request({
  method: 'put',
  url: `/users/${id}`,
  data: {
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

// 根据 query 条件查询用户列表

// 改变用户的启用状态
export const changeState = (id, state) => request({
  method: 'put',
  url: `/users/${id}/state/${state}`
}).then(res => res.data)

// 修改用户角色
export const changeRole = (userId, roleId) => request({
  method: 'put',
  url: `users/${userId}/role`,
  data: {
    rid: roleId
  }
}).then(res => res.data)
