const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: String,
    author: String,
    completed: Date,
    mode: String
});

bookSchema.statics.projectionFields = 'completed mode author title';
bookSchema.statics.sortFields = '-completed';
bookSchema.statics.searchFields = 'title author';

bookSchema.methods.setFromObject = function(object) {
    this.title = object.title;
    this.author = object.author;
    this.completed = object.completed;
    this.mode = object.mode;
};

mongoose.model('Book', bookSchema);
