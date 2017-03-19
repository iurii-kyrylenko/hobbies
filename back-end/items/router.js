const ItemsControllerFactory = require('../items/controller');
const usersController = require('../users/controller');
const jwt = require('express-jwt');
const multer  = require('multer');
const auth = jwt({ secret: process.env.JWT_SECRET });
const express = require('express');

const personal = (modelName) => {
  // Router should be put inside the exported function.
  // Otherwise it is cached and reused when calling
  // require('./items/router') again.
  //
  const router = express.Router();
  // validate JWT
  router.use(auth);
  // check if the user exists in db
  router.use(usersController.checkUser);

  const itemsController = ItemsControllerFactory(modelName);

  router.get('/', itemsController.getItems);
  router.get('/:id', itemsController.getItem);
  router.post('/', itemsController.addItem);
  router.put('/:id', itemsController.changeItem);
  router.delete('/:id', itemsController.deleteItem);
  router.post(
      '/upload',
      multer({ inMemory: true }).single('upload'),
      itemsController.uploadItems
  );

  return router;
};

const shared = (modelName) => {
  const router = express.Router();
  router.use(usersController.checkSharedData);
  const itemsController = ItemsControllerFactory(modelName);
  router.get('/', itemsController.getItems);
  return router;
};

module.exports = { personal, shared };
