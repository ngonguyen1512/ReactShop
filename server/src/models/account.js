'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.hasOne(models.Like, { foreignKey: 'idAccount', as: 'like_account' })
      Account.hasOne(models.Invoice, { foreignKey: 'idAccount', as: 'invoice_account' })
      Account.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'account_state' })
      Account.belongsTo(models.Permission, { foreignKey: 'idPermission', targetKey: 'id', as: 'account_permission' })
    }
  }
  Account.init({
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    idPermission: DataTypes.INTEGER,
    idState: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};