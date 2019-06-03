import Vue from 'vue'
import Router from 'vue-router'
// @ -- 自动找到 src 文件夹
import Login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login

    }
  ]
})
