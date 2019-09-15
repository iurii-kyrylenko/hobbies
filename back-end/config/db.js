const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.CONNECTION_STRING, { useMongoClient: true });

mongoose.connection
    .on('connected', () => console.log('mongo connected'))
    .on('error', () => console.log('mongo connection error'))
    .on('disconnected', () => console.log('mongo disconnectes'));

require('../items/book.model');
require('../items/movie.model');
require('../users/model');

