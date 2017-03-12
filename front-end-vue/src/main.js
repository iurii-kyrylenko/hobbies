// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { formatDate } from './helpers/formatters'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

// plug-in registration
Vue.use(Vuelidate)
Vue.filter('date', formatDate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
