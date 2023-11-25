'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quantity extends Model {
    static associate(models) {
      Quantity.belongsTo(models.Size, { foreignKey: 'idSize', targetKey: 'id', as: 'quantity_size' });
      Quantity.belongsTo(models.Color, { foreignKey: 'idColor', targetKey: 'id', as: 'quantity_color' });
      Quantity.belongsTo(models.Product, { foreignKey: 'idColor', targetKey: 'id', as: 'quantity_product' });
    }
  }
  Quantity.init({
    idProduct: DataTypes.INTEGER,
    idSize: DataTypes.INTEGER,
    idColor: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Quantity',
  });
  return Quantity;
};