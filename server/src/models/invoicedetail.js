'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    static associate(models) {
      InvoiceDetail.belongsTo(models.Invoice, { foreignKey: 'idInvoice', targetKey: 'id', as: 'detail_invoice' });
      InvoiceDetail.belongsTo(models.Product, { foreignKey: 'idProduct', targetKey: 'id', as: 'product_invoicedetail' });
    }
  }
  InvoiceDetail.init({
    idInvoice: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    idSize: DataTypes.INTEGER,
    idColor: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'InvoiceDetail',
  });
  return InvoiceDetail;
};