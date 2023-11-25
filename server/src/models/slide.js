'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    static associate(models) {
      Slide.belongsTo(models.State, { foreignKey: 'idState', targetKey: 'id', as: 'slide_state' });
    }
  }
  Slide.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    idState: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slide',
  });
  return Slide;
};