require('dotenv').config();
require('./config/db');
require('./config/passport');

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

// Allow CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }

    next();
});

server.use(passport.initialize());

server.use('/api/users', usersRouter);
server.use('/api/books', booksRouter);

server.listen(3000);
