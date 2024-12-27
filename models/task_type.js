"use strict";
const { Model, Deferrable  } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', { name: DataTypes.STRING })
    class TaskType extends Model {}
    TaskType.init(
        {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                require: true,
            },
            project_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                require: true,
                references: {
                    model: Project,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
        },
        {
            sequelize,
            modelName: "task_type",
            defaultPrimaryKey: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return TaskType;
};
