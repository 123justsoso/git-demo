import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/less/index.less'
import http from 'axios'
import '../api/mock'
import './assets/less/element-ui'

Vue.config.productionTip = false
Vue.prototype.$http = http;



new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router);
  }
}).$mount('#app')
