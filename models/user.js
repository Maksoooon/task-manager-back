'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
  }, {
    sequelize,
    modelName: 'user',
    defaultPrimaryKey: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    schema: "task_manager"
  });
  return User;
};