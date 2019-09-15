const request = require('request')

const getPosterUrl = (path) => {
  // Supported formats:
  // w92, w154, w185, w342, w500, w780, original
  return process.env.TMDB_IMAGE_STORE + 'w185' + path
}

const getResultFromTmdb = (entries) => {
  if (!entries.length) {
    return { found: false, title: null, plot: null, poster: null }
  }
  const entry = entries[0]
  return { found: true, title: entry.title, plot: entry.overview, poster: getPosterUrl(entry.poster_path) }
}

const getResultFromTmdbFind = (tmdb) => {
  return getResultFromTmdb([...tmdb.movie_results, ...tmdb.tv_results])
}

const getResultFromTmdbSearch = (tmdb) => {
  return getResultFromTmdb(tmdb.results)
}

// GET/find/{req.query.imdbId}
// query string: api_key=... & external_source=imdb_id
const get = (req, res) => {
  if (!req.query.imdbId) {
    res.sendStatus(400)
    return
  }

  const options = {
    method: 'get',
    url: process.env.TMDB_API + 'find/' + req.query.imdbId,
    qs: {
      api_key: process.env.TMDB_API_KEY,
      external_source: 'imdb_id'
    }
  }

  request(options, (err, _, body) => {
    if(err) {
      res.sendStatus(400)
      return
    }
    try {
      const tmdbResult = JSON.parse(body)
      const result = getResultFromTmdbFind(tmdbResult)
      res.send(result)
    }
    catch(e) {
      res.sendStatus(502)
      return
    }
  })
}

// GET /search/movie
// query string: api_key=... & query={req.query.title)
const search = (req, res) => {
  if (!req.query.title) {
    res.sendStatus(400)
    return
  }

  const options = {
    method: 'get',
    url: process.env.TMDB_API + 'search/movie',
    qs: {
      api_key: process.env.TMDB_API_KEY,
      query: req.query.title
    }
  }

  request(options, (err, _, body) => {
    if(err) {
      res.sendStatus(400)
      return
    }
    try {
      const tmdbResult = JSON.parse(body)
      const result = getResultFromTmdbSearch(tmdbResult)
      res.send(result)
    }
    catch(e) {
      res.sendStatus(502)
      return
    }
  })
}

module.exports = {
  get,
  search
}
