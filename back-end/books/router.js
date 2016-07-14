const express = require('express');
const router = express.Router();
const booksController = require('./controller');
const jwt = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

router.get('/', auth, booksController.getAll);
router.get('/:id', booksController.getBook);
router.post('/', booksController.addBook);
router.put('/:id', booksController.changeBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
