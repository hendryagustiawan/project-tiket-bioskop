'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.User, {foreignKey:'UserId'})
    }
  }
  News.init({
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
          msg : `imgUrl Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`imgUrl Can't be Empty`
        }
      }
    },
    content: {
      type : DataTypes.TEXT,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Content Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Content Can't be Empty`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};