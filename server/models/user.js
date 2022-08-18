'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, {foreignKey:'UserId'})
    }
  }
  User.init({
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
    password: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Password Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Password Can't be Empty`
        },
        maxCharacter(value){
          if(value.length < 5){
            throw new Error("Minimal character password 5")
          }
         }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Email Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Email Can't be Empty`
        },
        isEmail:{
          args : true,
          msg : 'Wrong Email Format'
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Role Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Role Can't be Empty`
        }
      }
    },
    phoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Phone Number Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Phone Number Can't be Empty`
        },
        firstCharacter(value){
          if(value[0] === '0'){
            throw new Error("Invalid Input Phone Number")
          }
         }
      }
    },
  }, {
    hooks:{
      beforeCreate : (data) =>{
        data.password = hashPassword(data.password)
      },
      beforeUpdate : (data) =>{
        data.password = hashPassword(data.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};