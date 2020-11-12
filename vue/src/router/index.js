/*
 * @Author: lixiaoyu
 * @Date: 2020-11-09 11:54:56
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-11-09 13:06:32
 */
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
