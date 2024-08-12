'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Desk extends Model {
    static associate(models) {
        Desk.hasMany(models.Task, {
            foreignKey: 'desk_uuid',
            allowNull: true
        });
    }
  }
  Desk.init({
    desk_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    desk_title: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'desks',
    defaultPrimaryKey: false,
    createdAt: false,
    updatedAt: false
  });
  return Desk;
};