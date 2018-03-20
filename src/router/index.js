import Vue from 'vue' //引入
import Router from 'vue-router'

import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'


Vue.use(Router)


export default new Router({
  mode: 'history',

  linkActiveClass:'active',

  routes: [
    { 
      path: "/", 
      redirect: '/goods' 
    },//设置重定向,登录自动跳转到goods
    {
      path: '/goods',
      name: 'goods',
      component: goods

    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
