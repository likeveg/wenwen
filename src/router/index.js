import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Main from '@/pages/Main'
import Income from '@/pages/Income'
import User from '@/pages/User'
import Qcode from '@/pages/Qcode'
import Distribution from '@/pages/Distribution'
import Check from '@/pages/Check'
import CheckInfo from '@/pages/CheckInfo'
import DistributionCode from '@/pages/DistributionCode'
import Performance from '@/pages/Performance'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Login',
    meta: {
      name: '闻问分销'
    },
    component: Login
  }, {
    path: '/main',
    name: 'Main',
    meta: {
      name: '闻问分销'
    },
    component: Main
  }, {
    path: '/income',
    name: 'Income',
    meta: {
      name: '用户收入详情'
    },
    component: Income
  }, {
    path: '/user',
    name: 'User',
    meta: {
      name: '用户注册详情'
    },
    component: User
  }, {
    path: '/qcode',
    name: 'Qcode',
    meta: {
      name: '兑换码'
    },
    component: Qcode
  }, {
    path: '/distribution',
    name: 'Distribution',
    meta: {
      name: '分销申请'
    },
    component: Distribution
  }, {
    path: '/check',
    name: 'Check',
    meta: {
      name: '审核列表'
    },
    component: Check
  }, {
    path: '/checkinfo',
    name: 'CheckInfo',
    meta: {
      name: '审核'
    },
    component: CheckInfo
  }, {
    path: '/distributioncode',
    name: 'DistributionCode',
    meta: {
      name: '分配兑换码'
    },
    component: DistributionCode
  }, {
    path: '/performance',
    name: 'Performance',
    meta: {
      name: '业绩'
    },
    component: Performance
  }]
})
router.beforeEach((to, from, next) => {
  // next()
  if (global.store.state.userid) { // 判断是否登录
    if (to.name === 'Login') {
      next('/main')
    } else {
      next()
    }
  } else {
    if (to.name === 'Login') {
      next()
    } else {
      next('/')
    }
  }
  document.title = to.meta.name
  // 判断是否为ios设备，ios设备需要通过加载iframe来刷新title
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    this.iframe = '/favicon.ico' + Math.random()
  }
})

export default router
