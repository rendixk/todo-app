'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Support extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Support.belongsTo(models.Users, { foreignKey: "userId", as: "User" })
    }
  }
  Support.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    }
    //userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Support',
  });
  return Support;
};