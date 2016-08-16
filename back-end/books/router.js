const express = require('express');
const router = express.Router();
const booksController = require('./controller');
const usersController = require('../users/controller');
const jwt = require('express-jwt');
const multer  = require('multer');

const auth = jwt({ secret: process.env.JWT_SECRET });
// validate IWT
router.use(auth);
// check if the user exists in db
router.use(usersController.checkUser);

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBook);
router.post('/', booksController.addBook);
router.put('/:id', booksController.changeBook);
router.delete('/:id', booksController.deleteBook);
router.post(
    '/upload',
    multer({ inMemory: true }).single('upload'),
    booksController.uploadBooks
);

module.exports = router;
