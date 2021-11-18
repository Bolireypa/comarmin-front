import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import CmApi from './api'
import 'chart.js'

import './index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  CmApi,
  render: h => h(App)
}).$mount('#app')
