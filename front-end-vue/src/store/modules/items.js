import axios from 'axios'
import config from '@/helpers/config'
import { saveAs } from 'file-saver/fileSaver'
import { uploadRequest } from '@/helpers/upload'

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
  filter: state => selector => state[selector].filter,
  item: state => selector => id => {
    const res = state[selector].items.filter(({ _id }) => _id === id)
    return !res.length ? null : res[0]
  }
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
  const headers = { Authorization: 'Bearer ' + rootState.auth.token }
  const { data } = await axios.get(endpoint, { headers, params })
  return data
}

const replaceForDownload = (key, value) => {
  if (key === '_id') return undefined
  if (value === '') return undefined
  if (key === 'completed') return value.split(/T/)[0]
  return value
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
  },

  async download ({ rootState }, selector) {
    const data = await httpGetItems(rootState, selector, {
      term: state[selector].filter
    })
    const blob = new Blob(
      [JSON.stringify(data.items, replaceForDownload, 1)],
      { type: 'application/json' })
    saveAs(blob, selector + '.json')
  },

  async upload ({ rootState, dispatch }, { selector, file }) {
    const endpoint = `${config.apiUrl}/${selector}/upload`
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await uploadRequest(endpoint, file, headers)
    return dispatch('applyFilter', { selector, filter: '' })
  },

  async delete ({ rootState, dispatch }, { selector, id }) {
    const endpoint = `${config.apiUrl}/${selector}/${id}`
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await axios.delete(endpoint, { headers })
    return dispatch('changePage', { selector, page: 1 })
  },

  async create ({ rootState, dispatch }, { selector, item }) {
    const endpoint = config.apiUrl + '/' + selector
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await axios.post(endpoint, item, { headers })
    return dispatch('changePage', { selector, page: 1 })
  },

  async modify ({ rootState, dispatch }, { selector, item, id }) {
    const endpoint = `${config.apiUrl}/${selector}/${id}`
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await axios.put(endpoint, item, { headers })
    return dispatch('changePage', { selector, page: 1 })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
