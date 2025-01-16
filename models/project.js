"use strict";
const { Model, Deferrable  } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', { name: DataTypes.STRING })
    class Project extends Model {}
    Project.init(
        {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            owner: {
                type: DataTypes.UUID,
                allowNull: false,
                require: true,
                references: {
                    model: User,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
        },
        {
            sequelize,
            modelName: "project",
            freezeTableName: true,
            defaultPrimaryKey: false,
            createdAt: false,
            updatedAt: false,
            schema: "task_manager"
        }
    );
    return Project;
};
