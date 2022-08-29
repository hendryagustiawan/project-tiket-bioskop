'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Username Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Username Can't be Empty`
        }
      }
    },
    activity: {
      type : DataTypes.TEXT,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Activity Promo Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Activity Promo Can't be Empty`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};