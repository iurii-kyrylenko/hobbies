const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const controller = {

    getAll(req, res) {
        Book.find().exec().then((books) => {
            res.send(books);
        });
    },

    getBook(req, res) {
        Book.findById(req.params.id).exec().then((book) => {
            if(book) {
                res.send(book);
             } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => res.sendStatus(400));
    },

    addBook(req, res) {
        const book = new Book(req.body);
        book.save((err) => {
            if(!err) {
                res.sendStatus(201);
            } else {
             res.sendStatus(400);
            }
        });
    },

    changeBook(req, res) {
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
    },

    deleteBook(req, res) {
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
    }
};

module.exports = controller;
