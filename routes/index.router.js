const express = require('express');

const contactsRouter = require('./contacts.router');
const usersRouter = require('./users.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/contacts', contactsRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
