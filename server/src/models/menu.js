'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Permission, { foreignKey: 'idPermission', targetKey: 'id', as: 'menu_permission' });
    }
  }
  Menu.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    idPermission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};