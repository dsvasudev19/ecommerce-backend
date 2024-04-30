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
      this.hasOne(models.Media, {
        foreignKey: 'mediable_id',
        as: 'featuredImage',
        constraints:false,
        scope: {
          featured: true
        }
      })
      this.hasMany(models.SubCategory,{
        foreignKey:'categoryId',
        as:'subcategories'
      })
    }
    

  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Category',
    tableName:'categories',
    paranoid:true
  });
  return Category;
};