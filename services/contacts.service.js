const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ContactsService {

  constructor(){
   }


  async create(data) {
    const newContact = await models.Contact.create(data);
    return newContact;
  }

  async find(userId) {
    const rta = await models.Contact.findAll({
      where: { userId }
    });
    return rta;
  }

  async findOne(id, userId) {
    const contact = await models.Contact.findByPk(id, {
      where: { userId }
    });
    if (!contact) {
      throw boom.notFound('contact not found');
    }
    return contact;
  }

  async update(id, changes, userId) {
    const contact = await this.findOne(id, userId);
    const rta = await contact.update(changes);
    return rta;
  }

  async delete(id, userId) {
    const contact = await this.findOne(id, userId);
    await contact.destroy();
    return { id };
  }


}

module.exports = ContactsService;
