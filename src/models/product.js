"use strict";
const { features } = require("process");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Media, {
        foreignKey: "mediable_id",
        as: "galleryImages",
        constraints: false,
      });
      this.hasMany(models.OrderItem, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      category: { type: DataTypes.INTEGER, allowNull: false },
      subCategory: DataTypes.INTEGER,
      name: { type: DataTypes.STRING, allowNull: false },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: this.name,
      },
      status: { type: DataTypes.TINYINT, allowNull: false },
      stock: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 25 },
      price: DataTypes.BIGINT,
      discount: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 12 },
      url:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:true,
      get() {
        const var1 = process.env.BASE_URL;
        const var2 = this.getDataValue("url")
        return var2 ? var1 + "/" + var2  : null;
      }
    }
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      paranoid: true,
    }
  );
  return Product;
};
