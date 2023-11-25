'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasOne(models.Like, { foreignKey: 'idProduct', as: 'like_product' })
      Product.hasOne(models.Image, { foreignKey: 'idProduct', as: 'image_product' })
      Product.hasOne(models.Quantity, { foreignKey: 'idProduct', as: 'quantity_product' })
      Product.hasOne(models.InvoiceDetail, { foreignKey: 'idProduct', as: 'product_invoicedetail' })
      Product.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'product_state' });
      Product.belongsTo(models.Sample, { foreignKey: 'idSample', targetKey: 'id', as: 'product_sample' });
      Product.belongsTo(models.Category, { foreignKey: 'idCategory', targetKey: 'id', as: 'product_category' });
    }
  }
  Product.init({
    idCategory: DataTypes.INTEGER,
    idSample: DataTypes.INTEGER,
    name: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    information: DataTypes.STRING,
    idState: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};