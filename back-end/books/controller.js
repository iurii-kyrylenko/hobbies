const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const getBooks = (req, res) => {

    const itemsPerPage = 5;

    const queryBuilder = (req) => {
        const query = Book
            .where({ userId: req.user._id })
            .select('completed mode author title')
            .sort('-completed');

        const term = req.query.term;
        if(term) {
            const re = new RegExp(term, 'i');
            query = query.or([
                { title: {$regex: re} },
                { author: {$regex: re} }
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

const getBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!book || !book.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
         }
        res.send(book);
    });
};

const addBook = (req, res) => {
    const book = new Book(req.body);
    book.userId = req.user._id;
    book.save((err) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(201);
    });
};

const changeBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!book || !book.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        book.title = req.body.title;
        book.author = req.body.author;
        book.completed = req.body.completed;
        book.mode = req.body.mode;
        book.save((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
        });
    });
};

const deleteBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!book || !book.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        book.remove((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
         });
    });
};

const uploadBooks = (req, res) => {
    const data = JSON.parse(req.file.buffer);
    const tasks = [];
    for(var i = 0; i < data.length; i++) {
        var book = new Book(data[i]);
        book.userId = req.user._id;
        tasks.push(book.save());
    }
    Promise.all(tasks)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    changeBook,
    deleteBook,
    uploadBooks
};
