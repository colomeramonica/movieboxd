'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        movieId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        reviewText: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            min: 0,
            max: 5
          }
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
    await queryInterface.dropTable('reviews');
  }
};
