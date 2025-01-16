'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {}
  Status.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
  }, {
    sequelize,
    modelName: 'status',
    defaultPrimaryKey: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    schema: "task_manager"
  });
  return Status;
};