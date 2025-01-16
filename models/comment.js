"use strict";
const { Model, Deferrable } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", { name: DataTypes.STRING });
    const Task = sequelize.define("task", { name: DataTypes.STRING });
    class Comment extends Model {}
    Comment.init(
        {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
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
            task_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                require: true,
                references: {
                    model: Task,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
        },
        {
            sequelize,
            modelName: "comment",
            defaultPrimaryKey: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
            schema: "task_manager",
        }
    );
    return Comment;
};
