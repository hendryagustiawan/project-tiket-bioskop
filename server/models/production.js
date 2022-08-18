'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Production extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Production.hasMany(models.Movie, {foreignKey:'ProductionId'})
    }
  }
  Production.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,

      validate:{
        notNull : {
          args : true,
          msg : `Production House Can't be Null`
        },
        notEmpty:{
          args : true,
          msg :`Production House Can't be Empty`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Production',
  });
  return Production;
};