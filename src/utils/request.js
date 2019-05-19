// 引入axios
import axios from 'axios'
import router from '@/router/index.js'
import { getToken } from '@/utils/auth.js'

// 请求模块：统一封装axios的使用

// 最简单方式，不建议
// 当我们的项目有多个不同的接口路径的时候，这种方式就不好用了
// axios.defaults.baseURL = 'http://api.example.com'

/**
 * 当项目有多个接口路径的时候，我们可以通过创建不同的 axios 实例来配置
 * axios 实例拥有的axios所有完整的功能
 */
const http = axios.create({
  // 配置好基准路径以后，请求的时候就不需要每一次都写一大坨
  baseURL: 'http://localhost:8888/api/private/v1/'
})
/**
 * axios 请求拦截器
 * 所有通过http（axios实例）发出去的请求都会经过这里
 * 请求首先进入这里，这里执行完才真正的请求发出去
 * 添加请求拦截器
 */
http.interceptors.request.use(function (config) {
  // console.log('请求通过，统一加token')
  // 我们可以针对非 /login 请求统一加 token
  if (config.url !== '/login') {
    config.headers.Authorization = getToken()
    // config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config // 这句代码是允许通过请求的规则
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
/**
 * axios 响应拦截器
 * 所有通过http（axios实例）发出去的请求收到的响应都会经过这里
 * 响应回来想进入这里然后再进入你真正发请求的地方
 * 添加响应拦截器
 */
http.interceptors.response.use(function (response) {
  console.log('响应拦截器收到响应了', response)
  console.log(router.currentRoute)

  // 统一处理 token 无效跳转到登录页
  if (response.data.meta.status === 401) {
    // router.replace('/login')
    return router.replace(`/login?redirect=${router.currentRoute.fullPath}`)
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default http
