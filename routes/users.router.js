const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const UserService = require('../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {config} = require('./../config/config');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();
/*
router.get('/', async (req, res) => {
    const users = await service.find();
    res.json(users)
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
*/
router.post('/register',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const user = await service.create(body);
    res.json({user});
  });

router.post('/login',
passport.authenticate('local', {session: false}),
async (req, res, next) => {
  try {
    const user = req.user;
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.jwtSecret);
    res.json({
      user,
      token
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.json({
      message: 'update',
      data: body,
      id,
    });
  } catch (error) {
    next(error);
  }

});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});



module.exports = router;
