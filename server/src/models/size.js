'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      Size.hasOne(models.InvoiceDetail, { foreignKey: 'idSize', as: 'invoicedetail_size' })
      Size.hasOne(models.Quantity, { foreignKey: 'idSize', as: 'quantity_size' })
      Size.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'size_state' })
    }
  }
  Size.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    idState: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};