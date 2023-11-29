'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allocation extends Model {
    static associate(models) {
      Allocation.belongsTo(models.Transfer, { foreignKey: 'idTransfer', targetKey: 'id', as: 'allocation_transfer' });
    }
  }
  Allocation.init({
    idTransfer: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allocation',
  });
  return Allocation;
};