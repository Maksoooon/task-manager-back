"use strict";

module.exports = {
    up: (queryInterface, Sequelize, migration) => {
        return queryInterface.sequelize.query(`
        BEGIN;
        create table desks(
            desk_uuid uuid PRIMARY KEY NOT NULL,
            desk_title text NOT NULL
        );
        alter table "Tasks" add column desk_uuid uuid;
        alter table "Tasks" ADD CONSTRAINT fk_tasks_desk FOREIGN KEY (desk_uuid) REFERENCES desks (desk_uuid);
        alter table "Tasks" alter column desk_uuid SET NOT NULL;
        COMMIT;
        `);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
         BEGIN;
         DROP table desks CASCADE;
         alter table "Tasks" drop column desk_uuid cascade;
         COMMIT;
        `);
    },
};
