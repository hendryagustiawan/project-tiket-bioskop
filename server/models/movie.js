"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: "UserId" });
      Movie.belongsTo(models.Production, { foreignKey: "ProductionId" });
      Movie.hasMany(models.Booking, { foreignKey: "MovieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Title Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Title Can't be Empty`,
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Image Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Image Can't be Empty`,
          },
        },
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Genre Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Genre Can't be Empty`,
          },
        },
      },
      producer: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Producer Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Producer Can't be Empty`,
          },
        },
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Director Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Director Can't be Empty`,
          },
        },
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Writer Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Writer Can't be Empty`,
          },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Synopsis Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Synopsis Can't be Empty`,
          },
        },
      },
      cast: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Cast Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Cast Can't be Empty`,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Price Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Price Can't be Empty`,
          },
          min: {
            args: 25000,
            msg: "Price minimum Rp 25.000",
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            msg: `Duration Can't be Null`,
          },
          notEmpty: {
            args: true,
            msg: `Duration Can't be Empty`,
          },
          min: {
            args: 60,
            msg: "Duration minimum 60 minutes",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      ProductionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
