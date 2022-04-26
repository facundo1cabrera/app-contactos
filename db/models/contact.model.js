const { Model, DataTypes, Sequelize} = require('sequelize');

const { USER_TABLE } = require('./user.model')


const CONTACTS_TABLE = 'contacts';

const ContactSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  number: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
}

class Contact extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACTS_TABLE,
      modelName: 'Contact',
      timestamps: false
    }
  }
}

module.exports = {CONTACTS_TABLE ,ContactSchema, Contact}
