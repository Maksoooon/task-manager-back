"use strict";
const { Model, Deferrable  } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', { name: DataTypes.STRING })
    const Status = sequelize.define('status', { name: DataTypes.STRING })
    class ProjectToStatus extends Model {}
    ProjectToStatus.init(
        {
            project_uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: Project,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            status_uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: Status,
                    key: "uuid",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                },
            },
        },
        {
            sequelize,
            modelName: "project_to_status",
            defaultPrimaryKey: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return ProjectToStatus;
};
