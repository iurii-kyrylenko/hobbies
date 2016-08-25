const express = require('express');
const router = express.Router();
const moviesController = require('./controller');
const usersController = require('../users/controller');
const jwt = require('express-jwt');
const multer  = require('multer');

const auth = jwt({ secret: process.env.JWT_SECRET });
// validate IWT
router.use(auth);
// check if the user exists in db
router.use(usersController.checkUser);

router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovie);
router.post('/', moviesController.addMovie);
router.put('/:id', moviesController.changeMovie);
router.delete('/:id', moviesController.deleteMovie);
router.post(
    '/upload',
    multer({ inMemory: true }).single('upload'),
    moviesController.uploadMovies
);

module.exports = router;
