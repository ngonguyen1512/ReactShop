'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.hasOne(models.Image, { foreignKey: 'idColor', as: 'image_color' })
      Color.hasOne(models.Quantity, { foreignKey: 'idColor', as: 'quantity_color' })
      Color.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'color_state' })
    }
  }
  Color.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    idState: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};