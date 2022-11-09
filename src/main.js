import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import Mint from 'mint-ui'; //饿了么公司组件
import wotui from './wotui' //京东组件

Vue.use(Mint);

Vue.use(wotui)

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import { List, Cell, DropdownMenu, DropdownItem, Popup } from 'vant';


Vue.use(VueAxiosPlugin);
Vue.use(List);
Vue.use(Cell);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Popup);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
