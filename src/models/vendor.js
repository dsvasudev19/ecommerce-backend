'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Store,{
        foreignKey:'vendorId',
        as:'stores'
      })
    }
  }
  Vendor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password: DataTypes.STRING,
    doj: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};