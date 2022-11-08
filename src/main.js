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
