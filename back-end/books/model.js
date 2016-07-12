const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: String,
    author: String,
    completed: Date,
    mode: String
});

const Book = mongoose.model('Book', Schema);

module.exports = Book;
