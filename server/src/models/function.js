'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Function extends Model {
    static associate(models) {
      Function.belongsTo(models.Permission, { foreignKey: 'idPermission', targetKey: 'id', as: 'function_permission' });
    }
  }
  Function.init({
    name: DataTypes.STRING,
    idPermission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Function',
  });
  return Function;
};