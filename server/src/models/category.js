'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasOne(models.Sample, { foreignKey: 'idCategory', as: 'sample_category' })
      Category.hasOne(models.Product, { foreignKey: 'idCategory', as: 'product_category' })
    }
  }
  Category.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};