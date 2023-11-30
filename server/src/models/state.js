'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    static associate(models) {
      State.hasOne(models.Color, { foreignKey: 'idState', as: 'color_state' })
      State.hasOne(models.Size, { foreignKey: 'idState', as: 'size_state' })
      State.hasOne(models.Slide, { foreignKey: 'idState', as: 'slide_state' })
      State.hasOne(models.Sample, { foreignKey: 'idState', as: 'sample_state' })
      State.hasOne(models.Invoice, { foreignKey: 'idState', as: 'invoice_state' })
      State.hasOne(models.Account, { foreignKey: 'idState', as: 'like_account' })
      State.hasOne(models.Product, { foreignKey: 'idState', as: 'product_state' })
      State.hasOne(models.Quantity, { foreignKey: 'idState', as: 'quantity_state' })
      State.hasOne(models.Permission, { foreignKey: 'idState', as: 'permission_state' })
    }
  }
  State.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};