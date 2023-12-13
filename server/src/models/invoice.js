'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.hasOne(models.InvoiceDetail, { foreignKey: 'idInvoice', as: 'detail_invoice' })
      Invoice.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'invoice_state' })
      Invoice.belongsTo(models.Account, { foreignKey: 'idAccount', targetKey: 'id', as: 'invoice_account' })
    }
  }
  Invoice.init({
    idAccount: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    ship: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    idAccept: DataTypes.INTEGER,
    idShip: DataTypes.INTEGER,
    idState: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};