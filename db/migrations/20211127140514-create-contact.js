'use strict';

const { ContactSchema, CONTACTS_TABLE} = require('./../models/contact.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(CONTACTS_TABLE, ContactSchema);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
