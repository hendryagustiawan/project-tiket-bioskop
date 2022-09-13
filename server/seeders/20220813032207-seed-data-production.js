"use strict";
let production = require("../data/production.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    production = production.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Productions", production, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Productions", null, {});
  },
};
