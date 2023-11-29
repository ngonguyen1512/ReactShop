'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.hasOne(models.Menu, {foreignKey: 'idPermission', as: 'menu_permission'})
      Permission.hasOne(models.Account, {foreignKey: 'idPermission', as: 'account_permission'})
      Permission.hasOne(models.Transmission, {foreignKey: 'idPermission', as: 'transmission_permission'})
      Permission.hasOne(models.Function, {foreignKey: 'idPermission', as: 'function_permission'})
      Permission.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'permission_state' });
    }
  }
  Permission.init({
    name: DataTypes.STRING,
    idState: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};