import Vue from 'vue'
import Vuex from 'vuex'
import notification from './modules/notification'
import auth from './modules/auth'
import localStoragePlugin from './plugins/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { notification, auth },
  plugins: [localStoragePlugin]
})
