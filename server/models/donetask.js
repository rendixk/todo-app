'use strict'
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoneTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoneTask.belongsTo(models.Users, { foreignKey: "userId", as: "User" })
    }
  }
  DoneTask.init({
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    note: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    // userId: DataTypes.INTEGER,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DoneTask',
  });
  return DoneTask;
};