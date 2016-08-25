const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

const getMovies = (req, res) => {

    const cb = (err, movies) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        res.send(movies);
    };

    // Descending sort on the completion date
    const query = Movie.where({ userId: req.user._id }).sort('-completed');

    const term = req.query.term;

    if(!term) {
        return query.exec(cb);
    }

    const re = new RegExp(term, 'i');

    return query
        .or([
            { title: {$regex: re} },
            { year: {$regex: re} },
            { notes: {$regex: re} }
        ])
        .exec(cb);
};

const getMovie = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!movie || !movie.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
         }
        res.send(movie);
    });
};

const addMovie = (req, res) => {
    const movie = new Movie(req.body);
    movie.userId = req.user._id;
    movie.save((err) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(201);
    });
};

const changeMovie = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!movie || !movie.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        movie.title = req.body.title;
        movie.year = req.body.year;
        movie.completed = req.body.completed;
        movie.notes = req.body.notes;
        movie.save((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
        });
    });
};

const deleteMovie = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!movie || !movie.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        movie.remove((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
         });
    });
};

const uploadMovies = (req, res) => {
    const data = JSON.parse(req.file.buffer);
    const tasks = [];
    for(var i = 0; i < data.length; i++) {
        var movie = new Movie(data[i]);
        movie.userId = req.user._id;
        tasks.push(movie.save());
    }
    Promise.all(tasks)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
};

module.exports = {
    getMovies,
    getMovie,
    addMovie,
    changeMovie,
    deleteMovie,
    uploadMovies
};
