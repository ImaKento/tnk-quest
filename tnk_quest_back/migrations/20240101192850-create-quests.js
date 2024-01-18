'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client: {
        type: Sequelize.STRING,
        defaultValue: "unknown"
      },
      title: {
        type: Sequelize.STRING,
        unique: true
      },
      deadline: {
        type: Sequelize.DATE
      },
      capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },
      rank: {
        type: Sequelize.STRING,
        defaultValue: "C"
      },
      overview: {
        type: Sequelize.STRING(1000),
      },
      hunters: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('quests');
  }
};
