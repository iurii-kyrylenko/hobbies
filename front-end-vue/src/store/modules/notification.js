const state = {
  msg: '',
  type: ''
}

const mutations = {
  notify (state, { msg, type }) {
    state.msg = msg
    state.type = type
  },
  remove (state) {
    state.msg = ''
    state.type = ''
  }
}

const getters = {
  message: state => state.msg,
  alertClass: state => 'alert-' + state.type
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
