const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: String,
    year: String,
    notes: String,
    completed: Date,
    imdbId: String
});

movieSchema.statics.projectionFields = 'completed year title notes imdbId';
movieSchema.statics.sortFields = '-completed';
movieSchema.statics.searchFields = 'title year notes';

movieSchema.methods.setFromObject = function(object) {
    this.title = object.title;
    this.year = object.year;
    this.completed = object.completed;
    this.notes = object.notes;
    this.imdbId = object.imdbId;
};

mongoose.model('Movie', movieSchema);
