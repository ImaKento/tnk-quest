'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hunterName: {
        type: Sequelize.STRING,
        defaultValue: "unknown"
      },
      threadId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'threads', // ここはモデル名ではなくテーブル名
          key: 'id',
        },
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('comments');
  }
};
