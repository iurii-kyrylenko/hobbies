import axios from 'axios'
import config from '@/helpers/config'

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
    if (response.found) {
      state.movieInfo = {
        title: response.title,
        posterUrl: response.poster,
        plot: response.plot
      }
      state.movieError = ''
    } else {
      state.movieError = 'Movie not found (:'
    }
  },
  setMovieProgress (state, progress) {
    state.movieProgress = progress
  },
  setMovieError (state, error) {
    state.movieError = error
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
//         found: true,
//         title: title,
//         poster: 'http://aaa/bbb.jpg',
//         plot: 'blah blah blah'
//       })
//     }, 1000)
//   })
//   return promise
// }

const actions = {
  async getMovieInfo ({ commit }, movie) {
    commit('setMovieProgress', true)

    // const data = await mockedResponse(movie.title)
    const endpoint = config.apiUrl + (movie.imdbId ? '/get-movie' : '/search-movie')
    const params = movie.imdbId ? { imdbId: movie.imdbId } : { title: movie.title }
    try {
      const { data } = await axios.get(endpoint, { params })
      commit('setMovieInfo', data)
      commit('setMovieProgress', false)
    }
    catch(e) {
      commit('setMovieProgress', false)
      commit('setMovieError', e.message)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
