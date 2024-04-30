'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Media,{
        foreignKey:"mediable_id",
        as:'profile',
        scope:{
          mediable_type:"Profile"
        },
        constraints:false
      })

    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users',
    paranoid:true
  });
  return User;
};