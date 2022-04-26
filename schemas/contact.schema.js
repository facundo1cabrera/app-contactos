const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(15);
const number = Joi.number();
const email = Joi.string().min(10).max(60);

const createContactSchema = Joi.object({
  name: name.required(),
  number: number.required(),
  email: email.required()
});

const updateContactSchema = Joi.object({
  name: name,
  number: number,
  email: email
});

const getContactSchema = Joi.object({
  id: id.required(),
});

module.exports = { createContactSchema, updateContactSchema, getContactSchema }
