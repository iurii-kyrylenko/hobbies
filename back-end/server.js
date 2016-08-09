//require('dotenv').config();
require('./config/db');
require('./config/passport');

const allowCORS = require('./config/cors');
const passport = require('passport');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./users/router')
const booksRouter = require('./books/router');
const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

if(process.env.ALLOW_CORS === 'yes') {
    allowCORS(server);
}

server.use(passport.initialize());

server.use('/api/users', usersRouter);
server.use('/api/books', booksRouter);

server.route('/*').get(function(req, res) {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3000);
