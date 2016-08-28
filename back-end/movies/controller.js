const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

const getMovies = (req, res) => {

    const itemsPerPage = 5;

    const queryBuilder = (req) => {
        const query = Movie
            .where({ userId: req.user._id })
            .select('completed year title notes')
            .sort('-completed');

        const term = req.query.term;
        if(term) {
            const re = new RegExp(term, 'i');
            query = query.or([
                { title: {$regex: re} },
                { year: {$regex: re} },
                { notes: {$regex: re} }
           ]);
        }
        return query;
    };

    const getPagesCount = (itemsCount) => {
        if(!itemsCount) return 0;
        const int = Math.floor(itemsCount / itemsPerPage);
        const mod = itemsCount % itemsPerPage;
        return mod ? int + 1 : int;
    };

    const callbackBuilder = (res, pages) => {
        return (err, items) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.send({ items, pages });
        };
    };

    const page = req.query.page;

    if(page) {
        queryBuilder(req).count().then(count => {
            const itemsToSkip = itemsPerPage * (page - 1);
            queryBuilder(req)
                .skip(itemsToSkip)
                .limit(itemsPerPage)
                .exec(callbackBuilder(res, getPagesCount(count)));
        });
    } else {
        // get all items in one page
        queryBuilder(req)
        .exec(callbackBuilder(res, 1));
    }
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
