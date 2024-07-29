'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      task_uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      task_title: {
        type: Sequelize.STRING
      },
      task_description: {
        type: Sequelize.STRING
      },
      task_created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      task_updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};