'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category,{
        foreignKey:'mediable_id',
        as:'featuredCategoryImage',
        constraints:false
      })

      this.belongsTo(models.User,{
        constraints:false,
        foreignKey:'mediable_id',
        as:'profile'
      })

      this.belongsTo(models.SubCategory,{
        foreignKey:'mediable_id',
        as:'featuredSubCategoryImage',
        constraints:false,
      })
    }
  }
  Media.init({
    mediable_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mediable_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const var1 = process.env.BASE_URL;
        const var2 = this.getDataValue("path").split("/")[1]
        const var3 = this.getDataValue("file_name");
        return var2 && var3 ? var1 + "/" + var2 + "/" + var3 : null;
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_size: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    featured: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    paranoid:true
  });
  return Media;
};