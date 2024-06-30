"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });

      // Order has many OrderItems
      this.hasMany(models.OrderItem, { foreignKey: "orderId" });

      // Order has one Payment (Transaction)
      this.hasOne(models.Transaction, { foreignKey: "orderId" });

      // Order has one ShippingAddress
      this.belongsTo(models.Address, {
        as: "ShippingAddress",
        foreignKey: "shippingAddressId",
      });

      // Order has one BillingAddress (if applicable)
      Order.belongsTo(models.Address, {
        as: "BillingAddress",
        foreignKey: "billingAddressId",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      totalAmount: DataTypes.FLOAT,
      status: DataTypes.STRING,
      paymentId: DataTypes.INTEGER,
      addressId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
