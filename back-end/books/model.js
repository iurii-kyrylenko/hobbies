const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    completed: Date,
    mode: String
});

mongoose.model('Book', bookSchema);
