const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: String,
    author: String,
    completed: Date,
    mode: String
});

const Book = mongoose.model('Book', Schema);

mongoose.connect('mongodb://localhost/test', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/api/books', (req, res) => {
    Book.find().then((books) => {
        res.status(200).json(books);
    });
});

server.listen(3000);
