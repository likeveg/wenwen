// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import globalvar from './constant'
global.constant = globalvar

import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store/'
global.store = store
import App from './App'

import {
  Alert,
  Group,
  XInput,
  XButton,
  Grid,
  GridItem,
  Cell,
  Card,
  XHeader,
  Flexbox,
  FlexboxItem,
  Panel,
  Divider,
  Scroller,
  LoadMore,
  WechatPlugin,
  AjaxPlugin,
  PopupPicker,
  Popup,
  XSwitch,
  TransferDom,
  Previewer,
  CheckIcon,
  XTextarea,
  PopupRadio,
  VChart,
  VBar,
  VTooltip,
  Toast
} from 'vux'
Vue.component('alert', Alert)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('cell', Cell)
Vue.component('card', Card)
Vue.component('x-header', XHeader)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('panel', Panel)
Vue.component('divider', Divider)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('popup-picker', PopupPicker)
Vue.component('popup', Popup)
Vue.component('x-switch', XSwitch)
Vue.directive('transfer-dom', TransferDom)
Vue.component('previewer', Previewer)
Vue.component('check-icon', CheckIcon)
Vue.component('x-textarea', XTextarea)
Vue.component('popup-radio', PopupRadio)
Vue.component('v-chart', VChart)
Vue.component('v-bar', VBar)
Vue.component('v-tooltip', VTooltip)
Vue.component('toast', Toast)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
console.log(Vue.wechat) // 可以直接访问 wx 对象。

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
