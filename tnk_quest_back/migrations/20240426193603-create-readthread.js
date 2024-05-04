'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userThreads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hunters', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      questId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quests', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      threadId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'threads', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      isRead: {
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
    await queryInterface.dropTable('userThreads');
  }
};
