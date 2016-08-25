const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: String,
    year: String,
    notes: String,
    completed: Date
});

mongoose.model('Movie', movieSchema);
