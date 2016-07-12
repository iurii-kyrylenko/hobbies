const express = require('express');
const router = express.Router();
const booksController = require('./controller');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getBook);
router.post('/', booksController.addBook);
router.put('/:id', booksController.changeBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
