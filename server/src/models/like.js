'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.Account, {foreignKey: 'idAccount', targetKey: 'id', as: 'like_account'})
      Like.belongsTo(models.Product, {foreignKey: 'idProduct', targetKey: 'id', as: 'like_product'})
    }
  }
  Like.init({
    idAccount: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};