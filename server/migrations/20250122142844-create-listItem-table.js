'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listItems',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: false
        },
        listId: {
          type: Sequelize.UUID,
          references: {
            model: 'Lists',
            key: 'id'
          }
        },
        movieId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('listItems');
  }
};
