'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    static associate(models) {
      Transfer.belongsTo(models.Permission, { foreignKey: 'idPermission', targetKey: 'id', as: 'transfer_permission' });
    }
  }
  Transfer.init({
    name: DataTypes.STRING,
    idPermission: DataTypes.INTEGER,
    relation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transfer',
  });
  return Transfer;
};