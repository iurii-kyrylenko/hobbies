import axios from 'axios'

const state = {
  token: localStorage['jwt']
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  resetToken (state) {
    state.token = ''
  }
}

const actions = {
  async login ({ commit }, user) {
    const endpoint = 'http://localhost:3000/api/users/login'
    const { data } = await axios.post(endpoint, user)
    commit('setToken', data.token)
  },
  logout ({ commit }) {
    commit('resetToken')
  }
}

const getPayload = ({ token }) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

const getters = {
  isLoggedIn (state) {
    if (!state.token) return false
    let payload = getPayload(state)
    return payload.exp > (Date.now() / 1000)
  },
  currentUser (state) {
    const { name, email } = getPayload(state)
    return { name, email }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
