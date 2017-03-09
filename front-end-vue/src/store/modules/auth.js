const state = {
  token: localStorage['jwt']
}

const mutations = {
}

const actions = {
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
