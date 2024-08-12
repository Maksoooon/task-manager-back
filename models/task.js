'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models['desks'], {
        foreignKey: 'desk_uuid'
      })
    }
  }
  Task.init({
    task_uuid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    task_title: DataTypes.STRING,
    task_description: DataTypes.STRING,
    desk_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Task',
    defaultPrimaryKey: false,
    createdAt: 'task_created_at',
    updatedAt: 'task_updated_at'
  });
  return Task;
};