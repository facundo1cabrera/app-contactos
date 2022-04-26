
const Joi = require('joi');

const id = Joi.number();
const password = Joi.string().min(3).max(15);
const email = Joi.string().min(10).max(60);


const createUserSchema = Joi.object({
  password: password.required(),
  email: email.required()
});

const updateUserSchema = Joi.object({
  password: password,
  email: email
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
