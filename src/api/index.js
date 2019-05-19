/**
 * 公共接口处理模块
 * 建议将请求都封装成一个一个的小函数，在需要的时候直接调用即可
 * 好处：
 *  维护方便
 *  可重用性
 */
import request from '@/utils/request.js'

// 用户登录
export const login = data => request({
  method: 'post',
  url: '/login',
  data: { // post 参数
    username: data.username,
    password: data.password
  }
}).then(res => res.data)
