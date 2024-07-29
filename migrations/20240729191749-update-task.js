'use strict';

module.exports = {

  up: (queryInterface, Sequelize, migration) => {
     return queryInterface.sequelize.query(`
        BEGIN;
        ALTER TABLE "Tasks" 
        RENAME COLUMN created_at TO task_created_at;
        ALTER TABLE "Tasks" 
        RENAME COLUMN updated_at TO task_updated_at;
        COMMIT;
        `);
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.sequelize.query(`
        BEGIN;
        ALTER TABLE "Tasks" 
        RENAME COLUMN task_created_at TO created_at;
        ALTER TABLE "Tasks" 
        RENAME COLUMN task_updated_at TO updated_at;
        COMMIT;
        `);
  }

};