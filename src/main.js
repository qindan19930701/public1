import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import ElementUI from 'element-ui'// 核心组件库
import 'element-ui/lib/theme-chalk/index.css'// 样式文件
import '@fortawesome/fontawesome-free/css/all.css' // 加载字体图标库
import './css/main.css'
import AppBreadcrumb from './components/AppBreadcrumd/index.vue'
import filters from './filters'

Vue.use(filters, {})

Vue.component('AppBreadcrumb', AppBreadcrumb)

Vue.use(ElementUI)// 注册element插件

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
