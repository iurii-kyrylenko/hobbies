import Vue from 'vue'
import Vuex from 'vuex'
import notification from './modules/notification'
import auth from './modules/auth'
import localStoragePlugin from './plugins/localStorage'
import items from './modules/items'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { notification, auth, items },
  plugins: [localStoragePlugin]
})
