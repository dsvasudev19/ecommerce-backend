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


      // Order has one ShippingAddress
      this.belongsTo(models.Address, {
        as: "ShippingAddress",
        foreignKey: "addressId",
        scope:{
          type:"Shipping"
        }
      });

      // Order has one BillingAddress (if applicable)
      Order.belongsTo(models.Address, {
        as: "BillingAddress",
        foreignKey: "addressId",
        scope:{
          type:"Billing"
        }
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
