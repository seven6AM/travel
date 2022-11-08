import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import Mint from 'mint-ui'; //饿了么公司组件
import wotui from './wotui' //京东组件
import vant from './vant' //vant2.0组件
import { Cell } from "vant";

Vue.use(Cell); 

Vue.use(vant)

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
