import axios from 'axios'

const state = {
  movieInfo: {
    title: '',
    posterUrl: '',
    plot: ''
  },
  movieProgress: false,
  movieError: ''
}

const mutations = {
  setMovieInfo (state, response) {
    if (response.Response === 'True') {
      state.movieInfo = {
        title: response.Title,
        posterUrl: response.Poster,
        plot: response.Plot
      }
      state.movieError = ''
    } else {
      state.movieError = response.Error || 'Movie not found (:'
    }
  },
  setMovieProgress (state, progress) {
    state.movieProgress = progress
  }
}

const getters = {
  movieInfo: state => state.movieInfo,
  movieProgress: state => state.movieProgress,
  movieError: state => state.movieError
}

// const mockedResponse = (title) => {
//   const promise = new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         Response: 'True',
//         Title: title,
//         Poster: 'http://aaa/bbb.jpg',
//         Plot: 'blah blah blah'
//       })
//     }, 1000)
//   })
//   return promise
// }

const actions = {
  async getMovieInfo ({ state, commit }, title) {
    commit('setMovieProgress', true)

    // const data = await mockedResponse(title)
    const endpoint = 'http://www.omdbapi.com/'
    const params = { t: title }
    const { data } = await axios.get(endpoint, { params })

    commit('setMovieInfo', data)
    commit('setMovieProgress', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
