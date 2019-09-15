import axios from 'axios'
import config from '@/helpers/config'

const state = {
  settings: {},
  users: [],
  page: 1,
  pageCount: 0,
  filter: ''
}

const getters = {
  settings: state => state.settings,
  users: state => state.users
    .map(({ name, shareBooks, shareMovies, books, movies, total, _id }) => ({
      _id,
      name,
      shareBooks,
      shareMovies,
      books,
      movies,
      total,
      tob: _id + '/' + name + '/b',
      tom: _id + '/' + name + '/m'
    })),
  page: state => state.page,
  pageCount: state => state.pageCount,
  filter: state => state.filter
}

const mutations = {
  updateSettings (state, settings) {
    state.settings = settings
  },
  setUsers (state, { items, pages }) {
    state.users = items
    state.pageCount = pages
  },
  setPage (state, page) {
    state.page = page
  },
  setFilter (state, filter) {
    state.filter = filter
  }
}

const actions = {

  async getSettings ({ rootState, commit }) {
    const endpoint = config.apiUrl + '/users/settings'
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    const { data } = await axios.get(endpoint, { headers })
    commit('updateSettings', data)
  },

  async saveSettings ({ rootState }, settings) {
    const endpoint = config.apiUrl + '/users/settings'
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    return await axios.put(endpoint, settings, { headers })
  },

  async getUsers ({ state, commit }) {
    const data = await httpGetUsers({
      page: state.page,
      term: state.filter
    })
    commit('setUsers', data)
  },

  async changePage ({ state, commit }, page) {
    const data = await httpGetUsers({
      page,
      term: state.filter
    })
    commit('setPage', page)
    commit('setUsers', data)
  },

  async applyFilter ({ commit }, filter) {
    const data = await httpGetUsers({
      page: 1,
      term: filter
    })
    commit('setPage', 1)
    commit('setFilter', filter)
    commit('setUsers', data)
  }
}

const httpGetUsers = async (params) => {
  const endpoint = config.apiUrl + '/users'
  const { data } = await axios.get(endpoint, { params })
  return data
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
