"use strict";
const { Model, Deferrable } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("project", { name: DataTypes.STRING });
    const Status = sequelize.define("status", { name: DataTypes.STRING });
    const User = sequelize.define("user", { name: DataTypes.STRING });
    const Sprint = sequelize.define("sprint", { name: DataTypes.STRING });
    class Task extends Model {}
    Task.init(
        {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                require: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                require: false,
                defaultValue: null,
                references: {},
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                require: true,
            },
            author_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                require: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                require: true,
                defaultValue: "backlog",
                references: {
                    model: Status,
                    key: "name",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            parent_uuid: {
                type: DataTypes.UUID,
                allowNull: true,
                require: false,
                references: {
                    model: User,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            project_uuid: {
                type: DataTypes.UUID,
                allowNull: true,
                defaultValue: null,
                require: false,
                references: {
                    model: Project,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            sprint_uuid: {
                type: DataTypes.UUID,
                allowNull: true,
                defaultValue: null,
                require: false,
                references: {
                    model: Sprint,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            time: {
                type: DataTypes.STRING,
                allowNull: true,
                require: false,
                defaultValue: null,
            },
            fact_time: {
                type: DataTypes.STRING,
                allowNull: true,
                require: false,
                defaultValue: null,
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: true,
                require: false,
                defaultValue: null,
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: true,
                require: false,
                defaultValue: null,
            },
            executor_uuid: {
                type: DataTypes.UUID,
                allowNull: true,
                defaultValue: null,
                references: {
                    model: User,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
        },
        {
            sequelize,
            modelName: "task",
            defaultPrimaryKey: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
            schema: "task_manager",
        }
    );
    return Task;
};
