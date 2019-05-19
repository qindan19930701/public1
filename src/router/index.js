// 路由模块
/**
 * 路由路径对应的是页面导航路径
 * 一般得管理系统都有用户-角色-权限功能
 * 用户能看到的导航菜单是不一样的，权限菜单数据都是后端处理给出
 * 所以就需要和后端协商好页面导航的路径字符
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'

import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import UserList from '@/views/user/index.vue'
import RoleList from '@/views/role/index.vue'
import RightsList from '@/views/rights'
import GoodsList from '@/views/goods'
import GoodsAdd from '@/views/goods/add'
import GoodsCategory from '@/views/goodsCategory'
import Category from '@/views/goodsCategory/category'
import OrdersList from '@/views/orders'
import ReportsList from '@/views/reports'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      // 先把 Layout 展示到 App.vue 的 router-view 中
      component: Layout,
      meta: { label: '首页' },
      children: [
        { name: 'home', path: '', component: Home },
        { name: 'users',
          path: '/users',
          component: {
            // 这个路由是一个直接渲染了 router-view 标签的组件
            render: c => c('router-view')
          },
          meta: { label: '用户管理' },
          children: [
            // 当你访问 /users/users 的时候，路径显示
            // meta 字段用于用户添加自定义数据，随便加
            { name: 'users-list', path: '/users/users', component: UserList, meta: { label: '用户列表' } }
          ]
        },
        { name: 'rights',
          path: '/rights',
          component: {
            // 这个路由是一个直接渲染了 router-view 标签的组件
            render: c => c('router-view')
          },
          meta: { label: '权限管理' },
          children: [
            // meta 字段用于用户添加自定义数据，随便加
            { name: 'roles-list', path: '/rights/roles', component: RoleList, meta: { label: '角色列表' } },
            { name: 'rights-list', path: '/rights/rights', component: RightsList, meta: { label: '权限列表' } }
          ]
        },
        { name: 'goods',
          path: '/goods',
          component: {
            // 这个路由是一个直接渲染了 router-view 标签的组件
            render: c => c('router-view')
          },
          meta: { label: '商品管理' },
          children: [
            // meta 字段用于用户添加自定义数据，随便加
            { name: 'goods-list', path: 'goods', component: GoodsList, meta: { label: '商品列表' } },
            { name: 'goods-add', path: 'toadd', component: GoodsAdd, meta: { label: '添加商品' } },
            { name: 'goods-category', path: 'categories', component: GoodsCategory, meta: { label: '商品分类' } },
            { name: 'goods-category-params', path: 'params', component: Category, meta: { label: '分类参数' } }
          ]
        },
        { name: 'orders',
          path: '/orders',
          component: {
            // 这个路由是一个直接渲染了 router-view 标签的组件
            render: c => c('router-view')
          },
          meta: { label: '订单管理' },
          children: [
            // 当你访问 /users/users 的时候，路径显示
            // meta 字段用于用户添加自定义数据，随便加
            { name: 'orders-list', path: 'orders', component: OrdersList, meta: { label: '订单列表' } }
          ]
        },
        { name: 'reports',
          path: '/reports',
          component: {
            // 这个路由是一个直接渲染了 router-view 标签的组件
            render: c => c('router-view')
          },
          meta: { label: '数据统计' },
          children: [
            // 当你访问 /users/users 的时候，路径显示
            // meta 字段用于用户添加自定义数据，随便加
            { name: 'reports-list', path: 'reports', component: ReportsList, meta: { label: '数据列表' } }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 如果请求的/login，则直接允许通过
  if (to.path === '/login') {
    next()
  }

  // 如果不是/login，就检查登录状态
  // const token = window.localStorage.getItem('token')
  const token = getToken()

  // 如果没有token，则让其跳转到/login
  if (!token) {
    return next('/login')
  }

  // 如果有token，则直接通过
  next()
})

export default router
