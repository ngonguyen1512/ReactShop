'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Color, { foreignKey: 'idColor', targetKey: 'id', as: 'image_color' })
      Image.belongsTo(models.Product, { foreignKey: 'idProduct', targetKey: 'id', as: 'image_product' })
    }
  }
  Image.init({
    idProduct: DataTypes.INTEGER,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
    idColor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};