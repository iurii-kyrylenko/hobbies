import axios from 'axios'
import config from '@/helpers/config'

const state = {
  books: {
    items: [],
    page: 1,
    pageCount: 0,
    filter: ''
  },
  movies: {
    items: [],
    page: 1,
    pageCount: 0,
    filter: ''
  }
}

const getters = {
  books: state => state.books.items,
  movies: state => state.movies.items,
  page: state => selector => state[selector].page,
  pageCount: state => selector => state[selector].pageCount,
  filter: state => selector => state[selector].filter
}

const mutations = {
  setItems (state, { selector, data }) {
    // deserialize date
    state[selector].items = data.items.map(item => {
      item.completed = new Date(item.completed)
      return item
    })
    state[selector].pageCount = data.pages
  },
  setPage (state, { selector, page }) {
    state[selector].page = page
  },
  setFilter (state, { selector, filter }) {
    state[selector].filter = filter
  }
}

const httpGetItems = async (rootState, selector, params) => {
  const endpoint = config.apiUrl + '/' + selector
  const authHeader = { Authorization: 'Bearer ' + rootState.auth.token }
  const { data } = await axios.get(endpoint, { headers: authHeader, params })
  return data
}

const actions = {

  async getItems ({ state, rootState, commit }, selector) {
    const data = await httpGetItems(rootState, selector, {
      page: state[selector].page,
      term: state[selector].filter
    })
    commit('setItems', { selector, data })
  },

  async changePage ({ state, rootState, commit }, { selector, page }) {
    const data = await httpGetItems(rootState, selector, {
      page,
      term: state[selector].filter
    })
    commit('setPage', { selector, page })
    commit('setItems', { selector, data })
  },

  async applyFilter ({ state, rootState, commit }, { selector, filter }) {
    const data = await httpGetItems(rootState, selector, {
      page: 1,
      term: filter
    })
    commit('setPage', { selector, page: 1 })
    commit('setFilter', { selector, filter })
    commit('setItems', { selector, data })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
