'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lists',
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
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: Sequelize.TEXT,
        private: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      },
      {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lists');
  }
};
