"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      imgUrl: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      producer: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
      },
      writer: {
        type: Sequelize.STRING,
      },
      synopsis: {
        type: Sequelize.TEXT,
      },
      cast: {
        type: Sequelize.STRING,
      },
      linkYT: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,

        references: {
          model: "Users",
          key: "id",
        },
      },
      ProductionId: {
        type: Sequelize.INTEGER,

        references: {
          model: "Productions",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movies");
  },
};
