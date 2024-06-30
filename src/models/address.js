"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });

      // Address can have many Orders associated with it (as Shipping or Billing Address)
      this.hasMany(models.Order, {
        as: "ShippingAddress",
        foreignKey: "shippingAddressId",
      });
      this.hasMany(models.Order, {
        as: "BillingAddress",
        foreignKey: "billingAddressId",
      });
    }
  }
  Address.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      line1: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      pincode: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
