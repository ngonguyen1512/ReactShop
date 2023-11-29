'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transmission.belongsTo(models.Transfer, { foreignKey: 'idTransfer', targetKey: 'id', as: 'transmission_transfer' });
      Transmission.belongsTo(models.Permission, { foreignKey: 'idPermission', targetKey: 'id', as: 'transmission_permission' });
    }
  }
  Transmission.init({
    idTransfer: DataTypes.INTEGER,
    idPermission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transmission',
  });
  return Transmission;
};