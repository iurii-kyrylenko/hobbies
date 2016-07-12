const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const booksRouter = require('./books/router')

const CONNECTION_STRING = 'mongodb://localhost/test';
const server = express();

mongoose.connect(CONNECTION_STRING);

mongoose.connection
    .on('connected', () => console.log('mongo connected'))
    .on('error', () => console.log('mongo connection error'))
    .on('disconnected', () => console.log('mongo disconnectes'));

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/books', booksRouter);

server.listen(3000);
