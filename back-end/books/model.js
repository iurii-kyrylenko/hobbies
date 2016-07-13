const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    completed: Date,
    mode: String
});

mongoose.model('Book', BookSchema);
