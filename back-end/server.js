// Uncomment for local environment or start the server using "heroku local"
// require('dotenv').config()

require('./config/db')
require('./config/passport')

const allowCORS = require('./config/cors')
const passport = require('passport')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./users/router')
const itemsRouter = require('./items/router')
const movieInfoController = require('./info/movieController')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

if(process.env.ALLOW_CORS === 'yes') {
    allowCORS(server)
}

server.use(passport.initialize())

// An artificial delay for debug purpose
//
// server.use((req, res, next) => {
//   setTimeout(() => next(), 1000)
// })

server.use('/api/users', usersRouter)
server.use('/api/books', itemsRouter.personal('Book'))
server.use('/api/movies', itemsRouter.personal('Movie'))
server.use('/api/shared/books', itemsRouter.shared('Book'))
server.use('/api/shared/movies', itemsRouter.shared('Movie'))
// Get info by movie id (qs=imdbId)
server.get('/api/get-movie', movieInfoController.get)
// Get info by movie title (qs=title)
server.get('/api/search-movie', movieInfoController.search)

// Get extra content
//
// const fs = require("fs")
// server.route(`/${process.env.EXTRA_CONTENT}/:file`)
// .get((req, res, next) => {
//   const file = path.join(__dirname, `extra/${req.params.file}`)
//   fs.exists(file, exists => {
//     if (exists) res.sendFile(file)
//     else next()
//   })
// })

server.route('/*').get(function(req, res) {
  return res.sendFile(path.join(__dirname, 'public/index.html'))
})

server.listen(process.env.PORT || 3000)
