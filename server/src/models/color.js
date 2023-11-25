'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.hasOne(models.Image, { foreignKey: 'idColor', as: 'image_color' })
      Color.hasOne(models.Quantity, { foreignKey: 'idColor', as: 'quantity_color' })
    }
  }
  Color.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};