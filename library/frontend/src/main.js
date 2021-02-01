import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import store from '../store/'
import Axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$http = Axios;

const token = localStorage.getItem('accessToken')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
