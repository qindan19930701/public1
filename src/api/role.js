/**
 * 角色接口相关处理模块
 */
import request from '@/utils/request'

/**
 * 获取角色列表
 */
export const getRoleList = () => request({
  method: 'get',
  url: '/roles'
}).then(res => res.data)

// 添加角色
export const addRole = ({ roleName, roleDesc }) => request({
  method: 'post',
  url: '/roles',
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)

// 删除角色
export const deleteRole = (roleId) => request({
  method: 'delete',
  url: `/roles/${roleId}`
}).then(res => res.data)

/**
 * 更新角色权限列表
 *  rid 需要提供以逗号分割的字符串id
 * 注意：父节点id也需要
 */
export const updateRoleRights = (roleId, rids) => request({
  method: 'post',
  url: `/roles/${roleId}/rights`,
  data: {
    rids
  }
}).then(res => res.data)

// 根据角色 id 删除对应权限
export const deleteRightsByRoleId = (roleId, rid) => request({
  method: 'delete',
  url: `/roles/${roleId}/rights/${rid}`
}).then(res => res.data)

// 根据id查询单个角色
export const findRoleById = roleId => request({
  method: 'get',
  url: `/roles/${roleId}`
}).then(res => res.data)

// 编辑角色
export const editRole = (roleId, data) => request({
  method: 'put',
  url: `/roles/${roleId}`,
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)
