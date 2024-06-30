'use strict';
const { features } = require('process');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasOne(models.Media, {
      //   foreignKey: 'mediable_id',
      //   as: 'featuredImage',
      //   constraints:false,
      //   scope: {
      //     featured: true
      //   }
      // })
      this.hasMany(models.SubCategory,{
        foreignKey:'categoryId',
        as:'subCategories',
        constraints:false
      })
    }
  
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: DataTypes.TINYINT,
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
  }, {
    sequelize,
    modelName: 'Category',
    tableName:'categories',
    paranoid:true
  });
  return Category;
};