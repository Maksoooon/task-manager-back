"use strict";
const { Model, Deferrable  } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', { name: DataTypes.STRING })
    const User = sequelize.define('user', { name: DataTypes.STRING })
    class Sprint extends Model {}
    Sprint.init(
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
            project_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Project,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false,
                require: true,
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false,
                require: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                require: true,
            },
            author_id: {
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
            modelName: "sprint",
            defaultPrimaryKey: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return Sprint;
};
