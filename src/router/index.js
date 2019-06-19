import Vue from 'vue'
import Router from 'vue-router'
// @ -- 自动找到 src 文件夹
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Roles from '@/components/role/roles.vue'
import Right from '@/components/role/right.vue'
import GoodList from '@/components/goods/goodlist.vue'
import GoodClassify from '@/components/goods/goodclassify.vue'
import ClassifyParam from '@/components/goods/classifyparam.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
        name: 'users',
        path: '/users',
        component: Users
      },
      {
        name: 'roles',
        path: '/roles',
        component: Roles
      }, {
        name: 'right',
        path: '/right',
        component: Right
      },
      {
        name: 'goodlist',
        path: '/goodlist',
        component: GoodList
      },
      {
        name: 'classifyparam',
        path: '/classifyparam',
        component: ClassifyParam
      },
      {
        name: 'goodclassify',
        path: '/goodclassify',
        component: GoodClassify
      }
    ]
  }]
})
