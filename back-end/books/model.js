const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: {
        type: String,
        unique: true,
        required: true
    },
    author: String,
    completed: Date,
    mode: String
});

mongoose.model('Book', bookSchema);
