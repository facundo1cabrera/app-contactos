const express = require('express');
const ContactsService = require('../services/contacts.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createContactSchema, updateContactSchema, getContactSchema } = require('./../schemas/contact.schema');
const passport = require('passport');

const router = express.Router();
const service = new ContactsService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const contacts = await service.find(req.user.sub);
    res.json(contacts)
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getContactSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await service.findOne(id, req.user.sub);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', { session: false}),
  validatorHandler(createContactSchema, 'body'),
  async (req, res, next) => {
  try{
    const body = req.body;
    const data = {
      ...body,
      userId: req.user.sub
    }
    const contact = await service.create(data);
    res.json({contact});
  } catch (error) {
    next(error);
  }
  });

router.patch('/:id',
  validatorHandler(getContactSchema, 'params'),
  validatorHandler(updateContactSchema, 'body'),
  (req, res, next) => {
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
  validatorHandler(getContactSchema, 'params'),
  (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});



module.exports = router;
