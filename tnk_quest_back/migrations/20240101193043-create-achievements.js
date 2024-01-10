'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('achievements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quest_title: {
        type: Sequelize.STRING
      },
      quest_rank: {
        type: Sequelize.STRING
      },
      hunterId: { // 外部キー
        type: Sequelize.INTEGER,
        references: {
          model: 'hunters', // 'hunters' テーブルを参照
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('achievements');
  }
};
