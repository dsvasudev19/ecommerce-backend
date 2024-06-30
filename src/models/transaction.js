'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, { foreignKey: 'orderId' });
      
      // Transaction belongs to a User
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Transaction.init({
    userId: DataTypes.INTEGER,
    orderId: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    status: DataTypes.STRING,
    currency: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};