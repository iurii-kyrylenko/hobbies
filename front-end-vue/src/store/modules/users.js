import axios from 'axios'
import config from '@/helpers/config'

const state = {
  settings: {}
}

const mutations = {
  updateSettings (state, settings) {
    state.settings = settings
  }
}

const getters = {
  settings: state => state.settings
}

const actions = {
  async getSettings ({ state, rootState, commit }) {
    const endpoint = config.apiUrl + '/users/settings'
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    const { data } = await axios.get(endpoint, { headers })
    commit('updateSettings', data)
  },
  async saveSettings ({ state, rootState }, settings) {
    const endpoint = config.apiUrl + '/users/settings'
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    return await axios.put(endpoint, settings, { headers })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
