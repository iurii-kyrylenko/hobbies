const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost/test';

mongoose.connect(CONNECTION_STRING);

mongoose.connection
    .on('connected', () => console.log('mongo connected'))
    .on('error', () => console.log('mongo connection error'))
    .on('disconnected', () => console.log('mongo disconnectes'));

require('../books/model');
require('../users/model');

