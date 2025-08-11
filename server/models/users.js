'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Task, { foreignKey: "userId" })
      Users.hasMany(models.DoneTask, { foreignKey: "userId" })
      Users.hasMany(models.Support, { foreignKey: "userId" })
    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true
      // validate: {
      //   notNull: { msg: "username must be filled"},
      //   notEmpty: { msg: "username cannot be empty"}
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "email must be filled"},
        notEmpty: { msg: "email cannot be empty"}
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "password must be filled"},
        notEmpty: { msg: "password cannot be empty"},
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  return Users;
};