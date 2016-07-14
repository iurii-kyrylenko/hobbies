const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING);

mongoose.connection
    .on('connected', () => console.log('mongo connected'))
    .on('error', () => console.log('mongo connection error'))
    .on('disconnected', () => console.log('mongo disconnectes'));

require('../books/model');
require('../users/model');

