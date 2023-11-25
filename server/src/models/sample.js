'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    static associate(models) {
      Sample.hasOne(models.Product, { foreignKey: 'idSample', as: 'product_sample' })
      Sample.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'sample_state' })
      Sample.belongsTo(models.Category, { foreignKey: 'idCategory', targetKey: 'id', as: 'sample_category' })
    }
  }
  Sample.init({
    idCategory: DataTypes.INTEGER,
    name: DataTypes.STRING,
    idState: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sample',
  });
  return Sample;
};