'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: false
        },
        tmdbId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        posterPath: Sequelize.STRING
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  }
};
