"use strict";
const { Model, Deferrable } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", { name: DataTypes.STRING });
    class Media extends Model {}
    Media.init(
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
            mimetype: {
                type: DataTypes.STRING,
                allowNull: false,
                require: true,
            },
            length: {
                type: DataTypes.INTEGER,
                allowNull: false,
                require: true,
            },
            encoding: {
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
            create_date: {
                type: DataTypes.DATE,
                allowNull: false,
                require: true,
            },
        },
        {
            sequelize,
            modelName: "media",
            defaultPrimaryKey: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
            schema: "task_manager",
        }
    );
    return Media;
};
