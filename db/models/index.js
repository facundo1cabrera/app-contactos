const { Contact, ContactSchema } = require('./contact.model');
const { User, UserSchema } = require('./User.model');

function setUpModels(sequelize) {
  Contact.init(ContactSchema, Contact.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  User.associate(sequelize.models);
  Contact.associate(sequelize.models);
}

module.exports = setUpModels;
