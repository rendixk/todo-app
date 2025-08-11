'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeConstraint('Tasks', 'Tasks_isCompleted_fkey');
    } catch (error) {
      console.log('Foreign key constraint "Tasks_isCompleted_fkey" does not exist. Skipping removal.')
    }

    await queryInterface.changeColumn('Tasks', 'isCompleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {

  }
};