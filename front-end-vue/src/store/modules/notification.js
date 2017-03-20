const state = {
  msg: '',
  type: '',
  status: ''
}

const mutations = {
  notify (state, { msg, type }) {
    state.msg = msg
    state.type = type
  },
  remove (state) {
    state.msg = ''
    state.type = ''
  },
  setStatus (state, status) {
    state.status = status
  }
}

const getters = {
  message: state => state.msg,
  alertClass: state => 'alert-' + state.type,
  status: status => state.status
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
