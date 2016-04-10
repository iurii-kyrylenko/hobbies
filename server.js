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

server.get('/api/books', (req, res) => {
    Book.find().exec().then((books) => {
        res.send(books);
    });
});

server.get('/api/books/:id', (req, res) => {
    Book.findById(req.params.id).exec().then((book) => {
        if(book) {
            res.send(book);
         } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => res.sendStatus(400));
});

server.post('/api/books', (req, res) => {
    const book = new Book(req.body);
    book.save((err) => {
        if(!err) {
            res.sendStatus(201);
        } else {
         res.sendStatus(400);
        }
    });
});

server.put('/api/books/:id', (req, res) => {
    Book.findById(req.params.id).exec().then((book) => {
        if(book) {
            book.title = req.body.title;
            book.author = req.body.author;
            book.completed = req.body.completed;
            book.mode = req.body.mode;

            book.save((err) => {
                if(!err) {
                    res.sendStatus(204);
                } else {
                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => res.sendStatus(400));
});

server.delete('/api/books/:id', (req, res) => {
    Book.findById(req.params.id).exec().then((book) => {
        if(book) {
            book.remove((err) => {
                if(!err) {
                    res.sendStatus(204);
                } else {
                    res.sendStatus(400);
                }
            });
         } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => res.sendStatus(400));
});

server.listen(3000);
