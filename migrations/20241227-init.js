"use strict";

module.exports = {
    up: (queryInterface, Sequelize, migration) => {
        return queryInterface.sequelize.query(`
        CREATE SCHEMA task_manager;
        SELECT pg_catalog.set_config('search_path', 'task_manager', false);
        CREATE TABLE project (
            "uuid" uuid DEFAULT gen_random_uuid(),
            "name" VARCHAR not NULL,
            description VARCHAR,
            "owner" uuid,
            PRIMARY KEY("uuid")
        );
        CREATE TABLE "user" (
            "uuid" uuid PRIMARY KEY,
            email VARCHAR UNIQUE not NULL,
            "password" VARCHAR
        );
        ALTER TABLE project
        add CONSTRAINT fk_user_project
        FOREIGN KEY ("owner")
        REFERENCES "user" ("uuid");
        CREATE TYPE sprint_status as enum ('backlog', 'in_progress', 'finished');
        CREATE TABLE sprint (
            "uuid" uuid PRIMARY KEY,
            title VARCHAR UNIQUE not NULL,
            project_id uuid REFERENCES project("uuid"),
            start_date TIMESTAMP,
            end_date TIMESTAMP,
            status sprint_status,
            author_id uuid REFERENCES "user"("uuid")
        );
        create TABLE "comment"(
            "uuid" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
            "text" text NOT NULL,
            author_id uuid REFERENCES "user"("uuid")
        );
        CREATE TABLE status (
            "uuid" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
            "name" VARCHAR NOT null
        );
        ALTER TABLE status
        ADD CONSTRAINT uniq_name UNIQUE("name");
        create TABLE project_to_status (
	    project_uuid uuid REFERENCES project("uuid") on update CASCADE on DELETE CASCADE,
  	    status_uuid uuid REFERENCES status("uuid") on UPDATE CASCADE,
  	    CONSTRAINT project_status_pkey PRIMARY KEY (project_uuid, status_uuid)
        );
        create TABLE media(
            "uuid" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
            "name" varchar not NULL,
            mimetype VARCHAR not NULL,
            "length" INTEGER not NULL,
            "encoding" VARCHAR NOT NULL,
            author_id uuid REFERENCES "user"("uuid"),
            create_date TIMESTAMP not NULL DEFAULT NOW()
        );
        create TABLE task(
            "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            title varchar not NULL,
            description text DEFAULT NULL,
            "type" VARCHAR,
            author_uuid uuid REFERENCES "user"("uuid") not NULL,
            status VARCHAR REFERENCES status("name"),
            parent_uuid uuid REFERENCES task("uuid"),
            project_uuid uuid REFERENCES project("uuid") not NULL,
            sprint_uuid uuid REFERENCES sprint("uuid"),
            "time" varchar,
            fact_time VARCHAR,
            start_date TIMESTAMP,
            end_date TIMESTAMP,
            executor_uuid uuid REFERENCES "user"("uuid")
        );
        create TABLE task_type(
            "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            "name" VARCHAR UNIQUE,
            project_uuid uuid REFERENCES project("uuid")
        );
        `);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
        DROP SCHEMA task_manager;
        `);
    },
};
