'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    static associate(models) {
      Transfer.hasOne(models.Allocation, {foreignKey: 'idTransfer', as: 'allocation_transfer'})
      Transfer.hasOne(models.Transmission, {foreignKey: 'idTransfer', as: 'transmission_transfer'})
    }
  }
  Transfer.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transfer',
  });
  return Transfer;
};