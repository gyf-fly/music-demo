import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
// Vue.use(axios)
Vue.prototype.$http = axios

Vue.config.productionTip = false

import VueLazyLoad from "vue-lazyload"
import gif from './static/login.gif'
import err from './static/err.gif'
Vue.use(VueLazyLoad, {
  error: err,
  loading: gif
})

import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui';
Vue.use(elementUi)
Vue.use(Loading)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import router from './router/index.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')