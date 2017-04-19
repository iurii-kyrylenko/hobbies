import axios from 'axios'
import config from '@/helpers/config'
import { saveAs } from 'file-saver/FileSaver'
import { uploadRequest } from '@/helpers/upload'

const state = {
  hobby: 'books',
  selector: 'shared',
  uid: '',
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
  },
  shared: {
    items: [],
    page: 1,
    pageCount: 0,
    filter: ''
  }
}

const getters = {
  my: state => !state.uid,
  items: state => state[state.selector].items,
  page: state => state[state.selector].page,
  pageCount: state => state[state.selector].pageCount,
  filter: state => state[state.selector].filter,
  item: state => id => {
    const res = state[state.selector].items.filter(({ _id }) => _id === id)
    return res.length ? res[0] : null
  }
}

const mutations = {
  clear (state, selector) {
    const ss = state[selector]
    ss.items = []
    ss.page = 1
    ss.pageCount = 0
    ss.filter = ''
  },
  select (state, { hobby, uid = '' }) {
    state.hobby = hobby
    state.uid = uid
    state.selector = uid ? 'shared' : hobby
  },
  setItems (state, { items, pages }) {
    // deserialize date
    state[state.selector].items = items.map(item => {
      item.completed = new Date(item.completed)
      return item
    })
    state[state.selector].pageCount = pages
  },
  setPage (state, page) {
    state[state.selector].page = page
  },
  setFilter (state, filter) {
    state[state.selector].filter = filter
  }
}

const httpGetItems = async (rootState, state, params) => {
  const endpoint = state.uid
    ? config.apiUrl + '/shared/' + state.hobby
    : config.apiUrl + '/' + state.hobby
  const headers = state.uid
    ? {}
    : { Authorization: 'Bearer ' + rootState.auth.token }
  params = state.uid
    ? { user: state.uid, ...params }
    : params
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

  async getItems ({ state, rootState, commit }) {
    const data = await httpGetItems(rootState, state, {
      page: state[state.selector].page,
      term: state[state.selector].filter
    })
    commit('setItems', data)
  },

  async changePage ({ state, rootState, commit }, page) {
    const data = await httpGetItems(rootState, state, {
      page,
      term: state[state.selector].filter
    })
    commit('setPage', page)
    commit('setItems', data)
  },

  async applyFilter ({ state, rootState, commit }, filter) {
    const data = await httpGetItems(rootState, state, {
      page: 1,
      term: filter
    })
    commit('setPage', 1)
    commit('setFilter', filter)
    commit('setItems', data)
  },

  async download ({ rootState, state }) {
    const data = await httpGetItems(rootState, state, {
      term: state[state.selector].filter
    })
    const blob = new Blob(
      [JSON.stringify(data.items, replaceForDownload, 1)],
      { type: 'application/json' })
    saveAs(blob, state.hobby + '.json')
  },

  async upload ({ rootState, state, dispatch }, file) {
    const endpoint = `${config.apiUrl}/${state.selector}/upload`
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await uploadRequest(endpoint, file, headers)
    return dispatch('applyFilter', '')
  },

  async delete ({ rootState, state, dispatch }, id) {
    const endpoint = `${config.apiUrl}/${state.selector}/${id}`
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await axios.delete(endpoint, { headers })
    return dispatch('changePage', 1)
  },

  async create ({ rootState, state, dispatch }, item) {
    const endpoint = config.apiUrl + '/' + state.selector
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await axios.post(endpoint, item, { headers })
    return dispatch('changePage', 1)
  },

  async modify ({ rootState, state, dispatch }, { item, id }) {
    const endpoint = `${config.apiUrl}/${state.selector}/${id}`
    const headers = { Authorization: 'Bearer ' + rootState.auth.token }
    await axios.put(endpoint, item, { headers })
    return dispatch('changePage', 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
