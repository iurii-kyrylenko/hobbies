import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { formatDate } from './helpers/formatters'
import 'bootstrap-css-only/css/bootstrap.css'

Vue.config.productionTip = false

// plug-in registration
Vue.use(Vuelidate)
Vue.filter('date', formatDate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
