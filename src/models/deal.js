'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deal.init({
    productId: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    validtill: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Deal',
  });
  return Deal;
};