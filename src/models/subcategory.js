'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category,{
        foreignKey:'categoryId',
        as:'categories'
      })
      this.hasOne(models.Media,{
        foreignKey:'mediable_id',
        as:'featuredImage',
        scope:{
          mediable_type:'SubCategory'
        },
        constraints:false
      })
    }
  }
  SubCategory.init({
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'SubCategory',
    tableName:'sub-categories',
    paranoid:true
  });
  return SubCategory;
};