import Vue from 'vue'
import Vuex from 'vuex'
import notification from './modules/notification'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { notification, auth }
})
