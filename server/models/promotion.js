'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotion.belongsTo(models.User, {foreignKey:'UserId'})
    }
  }
  Promotion.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Title Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Title Can't be Empty`
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Image Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Image Can't be Empty`
        }
      }
    },
    termAndCondition: {
      type : DataTypes.TEXT,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Term and Condition Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Term and Condition Can't be Empty`
        }
      }
    },
    howToGetPromo: {
      type : DataTypes.TEXT,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `How To Get Promo Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`How To Get Promo Can't be Empty`
        }
      }
    },
    UserId: {
      type : DataTypes.INTEGER,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `User Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`User Can't be Empty`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};